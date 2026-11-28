<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AdminOrderController extends Controller
{
    // Admin melihat semua pesanan
    public function index()
    {
        $orders = Order::with([
            'user:id,name,email',
            'items',
        ])
        ->latest('created_at')
        ->paginate(10);

        return response()->json([
            'message' => 'Daftar pesanan berhasil diambil.',
            'orders' => $orders,
        ]);
    }

    // Admin melihat detail pesanan
    public function show($order)
    {
        $order = Order::with([
            'user:id,name,email',
            'items',
        ])
        ->where('order_id', $order)
        ->firstOrFail();

        return response()->json([
            'message' => 'Detail pesanan berhasil diambil.',
            'order' => $order,
        ]);
    }

    // Admin mengubah status pesanan
    public function updateStatus(Request $request, int $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,shipped,completed,cancelled',
        ]);

        $updatedOrder = DB::transaction(function () use ($validated, $order) {

            $orderData = Order::where('order_id', $order)
                ->lockForUpdate()
                ->firstOrFail();

            $currentStatus = $orderData->status;
            $newStatus = $validated['status'];

            // Pesanan yang sudah dibatalkan tidak boleh diaktifkan kembali
            if ($currentStatus === 'cancelled' && $newStatus !== 'cancelled') {
                throw ValidationException::withMessages([
                    'status' => 'Pesanan yang sudah dibatalkan tidak dapat diaktifkan kembali.',
                ]);
            }

            // Batalkan pesanan dan kembalikan stok
            if ($newStatus === 'cancelled' && $currentStatus !== 'cancelled') {

                if (!in_array($currentStatus, ['pending', 'processing'])) {
                    throw ValidationException::withMessages([
                        'status' => 'Pesanan yang sudah dikirim atau selesai tidak dapat dibatalkan.',
                    ]);
                }

                $items = OrderItem::where(
                    'order_id',
                    $orderData->order_id
                )->get();

                foreach ($items as $item) {

                    // Produk mungkin sudah dihapus dari katalog
                    if ($item->product_id === null) {
                        continue;
                    }

                    $product = Product::where(
                        'product_id',
                        $item->product_id
                    )
                    ->lockForUpdate()
                    ->first();

                    if ($product) {
                        $product->increment('stock', $item->quantity);
                    }
                }
            }

            $orderData->update([
                'status' => $newStatus,
            ]);

            return $orderData;
        });

        $updatedOrder->load('items');

        return response()->json([
            'message' => 'Status pesanan berhasil diperbarui.',
            'order' => $updatedOrder,
        ]);
    }

    // Admin mengonfirmasi status pembayaran
    public function updatePaymentStatus(Request $request, int $order)
    {
        $validated = $request->validate([
            'payment_status' => 'required|in:unpaid,paid,failed',
        ]);

        $updatedOrder = DB::transaction(function () use ($validated, $order) {

            $orderData = Order::where('order_id', $order)
                ->lockForUpdate()
                ->firstOrFail();

            if ($orderData->status === 'cancelled') {
                throw ValidationException::withMessages([
                    'payment_status' => 'Pesanan yang dibatalkan tidak dapat diperbarui pembayarannya.',
                ]);
            }

            $orderData->update([
                'payment_status' => $validated['payment_status'],
            ]);

            return $orderData;
        });

        return response()->json([
            'message' => 'Status pembayaran berhasil diperbarui.',
            'order' => $updatedOrder,
        ]);
    }
}
