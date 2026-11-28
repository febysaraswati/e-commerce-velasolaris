<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class AdminCustomerController extends Controller
{
    // Admin melihat daftar Customer
    public function index()
    {
        $customers = User::where('role', 'customer')
            ->select('id', 'name', 'email', 'created_at')
            ->withCount('orders')
            ->latest('created_at')
            ->paginate(10);

        return response()->json([
            'message' => 'Daftar Customer berhasil diambil.',
            'customers' => $customers,
        ]);
    }

    // Admin melihat detail Customer dan riwayat pesanan
    public function show(int $customer)
    {
        $customer = User::where('role', 'customer')
            ->where('id', $customer)
            ->select('id', 'name', 'email', 'created_at')
            ->with([
                'orders' => function ($query) {
                    $query->select(
                        'order_id',
                        'user_id',
                        'order_number',
                        'subtotal',
                        'shipping_cost',
                        'total',
                        'status',
                        'payment_status',
                        'created_at'
                    )
                    ->with('items')
                    ->latest('created_at');
                },
            ])
            ->withCount('orders')
            ->firstOrFail();

        return response()->json([
            'message' => 'Detail Customer berhasil diambil.',
            'customer' => $customer,
        ]);
    }
}
