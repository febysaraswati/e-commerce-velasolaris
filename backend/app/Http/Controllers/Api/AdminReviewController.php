<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;

class AdminReviewController extends Controller
{
    // Admin melihat semua ulasan
    public function index()
    {
        $reviews = Review::with([
            'user:id,name,email',
            'product:product_id,name',
            'order:order_id,order_number',
        ])
            ->latest()
            ->paginate(10);

        return response()->json($reviews);
    }

    // Admin melihat detail ulasan
    public function show(int $review)
    {
        $data = Review::with([
            'user:id,name,email',
            'product:product_id,name',
            'order:order_id,order_number',
        ])
            ->where('review_id', $review)
            ->firstOrFail();

        return response()->json([
            'data' => $data,
        ]);
    }

    // Admin menghapus ulasan
    public function destroy(int $review)
    {
        $data = Review::where('review_id', $review)
            ->firstOrFail();

        $data->delete();

        return response()->json([
            'message' => 'Ulasan berhasil dihapus oleh Admin.',
        ]);
    }
}