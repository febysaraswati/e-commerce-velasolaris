<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;

class AdminDashboardController extends Controller
{
    // Admin melihat ringkasan dashboard
    public function index()
    {
        // Total data
        $totalProducts = Product::count();

        $totalOrders = Order::count();

        $totalCustomers = User::where('role', 'customer')->count();

        // Pendapatan dari pesanan selesai dan sudah dibayar
        $totalRevenue = Order::where('status', 'completed')
            ->where('payment_status', 'paid')
            ->sum('total');

        // Jumlah pesanan berdasarkan status
        $ordersByStatus = Order::selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->get();

        // Lima pesanan terbaru
        $recentOrders = Order::with([
            'user:id,name,email',
            'items',
        ])
        ->latest('created_at')
        ->take(5)
        ->get();

        return response()->json([
            'message' => 'Data dashboard berhasil diambil.',
            'summary' => [
                'total_products' => $totalProducts,
                'total_orders' => $totalOrders,
                'total_customers' => $totalCustomers,
                'total_revenue' => (float) $totalRevenue,
            ],
            'orders_by_status' => $ordersByStatus,
            'recent_orders' => $recentOrders,
        ]);
    }
}
