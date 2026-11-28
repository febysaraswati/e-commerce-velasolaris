<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Consultation;
use App\Models\Product;
use Illuminate\Http\Request;

class ConsultationController extends Controller
{
    // Customer mengirim permintaan konsultasi
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'nullable|exists:products,product_id',
            'customer_name' => 'required|string|max:150',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:30',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'province' => 'nullable|string|max:100',
            'system_type' => 'nullable|string|max:100',
            'monthly_electricity_bill' => 'nullable|numeric|min:0',
            'message' => 'nullable|string',
        ]);

        $productName = null;

        if (!empty($validated['product_id'])) {
            $product = Product::where(
                'product_id',
                $validated['product_id']
            )->firstOrFail();

            $productName = $product->name;
        }

        $consultation = Consultation::create([
            'user_id' => $request->user()->id,
            'product_id' => $validated['product_id'] ?? null,
            'product_name' => $productName,
            'customer_name' => $validated['customer_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'address' => $validated['address'] ?? null,
            'city' => $validated['city'] ?? null,
            'province' => $validated['province'] ?? null,
            'system_type' => $validated['system_type'] ?? null,
            'monthly_electricity_bill' =>
                $validated['monthly_electricity_bill'] ?? null,
            'message' => $validated['message'] ?? null,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Permintaan konsultasi berhasil dikirim.',
            'consultation' => $consultation,
        ], 201);
    }

    // Customer melihat konsultasi miliknya
    public function index(Request $request)
    {
        $consultations = Consultation::where(
            'user_id',
            $request->user()->id
        )
        ->latest('created_at')
        ->paginate(10);

        return response()->json([
            'message' => 'Daftar konsultasi berhasil diambil.',
            'consultations' => $consultations,
        ]);
    }

    // Customer melihat detail konsultasi miliknya
    public function show(Request $request, int $consultation)
    {
        $consultation = Consultation::where(
            'user_id',
            $request->user()->id
        )
        ->where('consultation_id', $consultation)
        ->firstOrFail();

        return response()->json([
            'message' => 'Detail konsultasi berhasil diambil.',
            'consultation' => $consultation,
        ]);
    }
}
