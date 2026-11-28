<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    // Customer memberikan ulasan
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,product_id',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:2000',
        ]);

        $user = $request->user();

        // Cari pesanan customer yang sudah selesai dan dibayar
        $order = Order::where('user_id', $user->id)
            ->where('status', 'completed')
            ->where('payment_status', 'paid')
            ->whereHas('items', function ($query) use ($validated) {
                $query->where('product_id', $validated['product_id']);
            })
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Kamu belum memiliki pembelian produk ini yang selesai dan dibayar.',
            ], 403);
        }

        // Cek apakah customer sudah pernah mengulas produk
        $existingReview = Review::where('user_id', $user->id)
            ->where('product_id', $validated['product_id'])
            ->exists();

        if ($existingReview) {
            return response()->json([
                'message' => 'Kamu sudah memberikan ulasan untuk produk ini.',
            ], 409);
        }

        $review = Review::create([
            'user_id' => $user->id,
            'product_id' => $validated['product_id'],
            'order_id' => $order->order_id,
            'rating' => $validated['rating'],
            'review' => $validated['review'] ?? null,
        ]);

        return response()->json([
            'message' => 'Ulasan berhasil ditambahkan.',
            'data' => $review->load('user:id,name'),
        ], 201);
    }

    // Melihat ulasan milik customer sendiri
    public function myReviews(Request $request)
    {
        $reviews = Review::with('product:product_id,name')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(10);

        return response()->json($reviews);
    }

    // Customer mengubah ulasannya sendiri
    public function update(Request $request, int $review)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:2000',
        ]);

        $data = Review::where('review_id', $review)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $data->update($validated);

        return response()->json([
            'message' => 'Ulasan berhasil diperbarui.',
            'data' => $data,
        ]);
    }

    // Customer menghapus ulasannya sendiri
    public function destroy(Request $request, int $review)
    {
        $data = Review::where('review_id', $review)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $data->delete();

        return response()->json([
            'message' => 'Ulasan berhasil dihapus.',
        ]);
    }

    // Melihat ulasan pada satu produk
    public function productReviews(int $product)
    {
        Product::where('product_id', $product)->firstOrFail();

        $reviews = Review::with('user:id,name')
            ->where('product_id', $product)
            ->latest()
            ->paginate(10);

        $ratingAverage = Review::where('product_id', $product)
            ->avg('rating');

        $totalReviews = Review::where('product_id', $product)
            ->count();

        return response()->json([
            'average_rating' => round($ratingAverage ?? 0, 1),
            'total_reviews' => $totalReviews,
            'data' => $reviews,
        ]);
    }
}