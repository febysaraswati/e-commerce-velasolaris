<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    // Melihat keranjang Customer
    public function index(Request $request)
    {
        $cart = Cart::firstOrCreate([
            'user_id' => $request->user()->id,
            'status' => 'active',
        ]);

        $cart->load('items.product.category');

        $subtotal = $cart->items->sum(function ($item) {
            return $item->product->price * $item->quantity;
        });

        return response()->json([
            'message' => 'Keranjang berhasil ditampilkan.',
            'cart' => $cart,
            'subtotal' => $subtotal,
        ]);
    }

    // Menambahkan produk ke keranjang
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,product_id',
            'quantity' => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($request, $validated) {
            $product = Product::where(
                'product_id',
                $validated['product_id']
            )->lockForUpdate()->firstOrFail();

            $cart = Cart::firstOrCreate([
                'user_id' => $request->user()->id,
                'status' => 'active',
            ]);

            $cartItem = CartItem::where('cart_id', $cart->cart_id)
                ->where('product_id', $product->product_id)
                ->first();

            $newQuantity = $validated['quantity'];

            if ($cartItem) {
                $newQuantity += $cartItem->quantity;
            }

            if ($newQuantity > $product->stock) {
                return response()->json([
                    'message' => 'Jumlah produk melebihi stok yang tersedia.',
                    'stock' => $product->stock,
                ], 422);
            }

            if ($cartItem) {
                $cartItem->update([
                    'quantity' => $newQuantity,
                ]);
            } else {
                $cartItem = CartItem::create([
                    'cart_id' => $cart->cart_id,
                    'product_id' => $product->product_id,
                    'quantity' => $newQuantity,
                ]);
            }

            $cartItem->load('product.category');

            return response()->json([
                'message' => 'Produk berhasil ditambahkan ke keranjang.',
                'cart_item' => $cartItem,
            ], 201);
        });
    }

    // Mengubah jumlah produk dalam keranjang
    public function update(Request $request, CartItem $cartItem)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        if ($cartItem->cart->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Kamu tidak memiliki akses ke keranjang ini.',
            ], 403);
        }

        $product = Product::findOrFail($cartItem->product_id);

        if ($validated['quantity'] > $product->stock) {
            return response()->json([
                'message' => 'Jumlah produk melebihi stok yang tersedia.',
                'stock' => $product->stock,
            ], 422);
        }

        $cartItem->update([
            'quantity' => $validated['quantity'],
        ]);

        $cartItem->load('product.category');

        return response()->json([
            'message' => 'Jumlah produk berhasil diperbarui.',
            'cart_item' => $cartItem,
        ]);
    }

    // Menghapus produk dari keranjang
    public function destroy(Request $request, CartItem $cartItem)
    {
        if ($cartItem->cart->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Kamu tidak memiliki akses ke keranjang ini.',
            ], 403);
        }

        $cartItem->delete();

        return response()->json([
            'message' => 'Produk berhasil dihapus dari keranjang.',
        ]);
    }
}
