<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CheckoutController extends Controller
{
    // Customer melakukan checkout
    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:150',
            'phone' => 'required|string|max:30',
            'address' => 'required|string',
            'city' => 'required|string|max:100',
            'province' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'payment_method' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
        ]);

        $order = DB::transaction(function () use ($request, $validated) {

            // Mengunci keranjang aktif milik Customer
            $cart = Cart::where('user_id', $request->user()->id)
                ->where('status', 'active')
                ->lockForUpdate()
                ->first();

            if (!$cart) {
                throw ValidationException::withMessages([
                    'cart' => 'Keranjang aktif tidak ditemukan.',
                ]);
            }

            // Mengunci item keranjang agar tidak berubah
            $cartItems = CartItem::where('cart_id', $cart->cart_id)
                ->lockForUpdate()
                ->get();

            if ($cartItems->isEmpty()) {
                throw ValidationException::withMessages([
                    'cart' => 'Keranjang masih kosong.',
                ]);
            }

            $subtotal = 0;
            $orderItemsData = [];

            // Periksa stok dan ambil harga terbaru dari database
            foreach ($cartItems as $cartItem) {

                $product = Product::where(
                    'product_id',
                    $cartItem->product_id
                )
                ->lockForUpdate()
                ->first();

                if (!$product) {
                    throw ValidationException::withMessages([
                        'product' => 'Produk tidak ditemukan.',
                    ]);
                }

                if ($product->stock < $cartItem->quantity) {
                    throw ValidationException::withMessages([
                        'stock' => 'Stok produk ' . $product->name .
                            ' tidak mencukupi.',
                    ]);
                }

                $price = (float) $product->price;
                $quantity = (int) $cartItem->quantity;
                $itemSubtotal = $price * $quantity;

                $subtotal += $itemSubtotal;

                // Simpan snapshot nama dan harga saat checkout
                $orderItemsData[] = [
                    'product_id' => $product->product_id,
                    'product_name' => $product->name,
                    'price' => $price,
                    'quantity' => $quantity,
                    'subtotal' => $itemSubtotal,
                ];
            }

            // Biaya pengiriman sementara 0 untuk pengujian
            $shippingCost = 0;
            $total = $subtotal + $shippingCost;

            // Buat nomor pesanan
            $orderNumber = 'VS-' . now()->format('YmdHis')
                . '-' . strtoupper(
                    substr(uniqid(), -5)
                );

            // Simpan data pesanan
            $order = Order::create([
                'user_id' => $request->user()->id,
                'order_number' => $orderNumber,
                'subtotal' => $subtotal,
                'shipping_cost' => $shippingCost,
                'total' => $total,
                'status' => 'pending',
                'payment_status' => 'unpaid',
                'payment_method' => $validated['payment_method'] ?? null,
                'customer_name' => $validated['customer_name'],
                'phone' => $validated['phone'],
                'address' => $validated['address'],
                'city' => $validated['city'],
                'province' => $validated['province'],
                'postal_code' => $validated['postal_code'],
                'notes' => $validated['notes'] ?? null,
            ]);

            // Simpan detail pesanan dan kurangi stok
            foreach ($orderItemsData as $itemData) {

                OrderItem::create(array_merge(
                    ['order_id' => $order->order_id],
                    $itemData
                ));

                Product::where(
                    'product_id',
                    $itemData['product_id']
                )->decrement(
                    'stock',
                    $itemData['quantity']
                );
            }

            // Kosongkan item keranjang
            CartItem::where('cart_id', $cart->cart_id)->delete();

            // Tandai keranjang selesai
            $cart->update([
                'status' => 'checked_out',
            ]);

            return $order;
        });

        $order->load('items');

        return response()->json([
            'message' => 'Checkout berhasil. Pesanan berhasil dibuat.',
            'order' => $order,
        ], 201);
    }

    // Customer melihat daftar pesanan miliknya
    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->with('items')
            ->latest('created_at')
            ->paginate(10);

        return response()->json([
            'message' => 'Daftar pesanan berhasil diambil.',
            'orders' => $orders,
        ]);
    }

    // Customer melihat detail pesanan miliknya
    public function show(Request $request, int $order)
    {
        $order = Order::where('user_id', $request->user()->id)
            ->where('order_id', $order)
            ->with('items')
            ->firstOrFail();

        return response()->json([
            'message' => 'Detail pesanan berhasil diambil.',
            'order' => $order,
        ]);
    }
}
