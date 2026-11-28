<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Consultation;
use Illuminate\Http\Request;

class AdminConsultationController extends Controller
{
    // Admin melihat semua permintaan konsultasi
    public function index()
    {
        $consultations = Consultation::with('user:id,name,email')
            ->latest('created_at')
            ->paginate(10);

        return response()->json([
            'message' => 'Daftar konsultasi berhasil diambil.',
            'consultations' => $consultations,
        ]);
    }

    // Admin melihat detail konsultasi
    public function show(int $consultation)
    {
        $consultation = Consultation::with('user:id,name,email')
            ->where('consultation_id', $consultation)
            ->firstOrFail();

        return response()->json([
            'message' => 'Detail konsultasi berhasil diambil.',
            'consultation' => $consultation,
        ]);
    }

    // Admin memperbarui status dan penawaran
    public function update(Request $request, int $consultation)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,contacted,quoted,accepted,rejected,completed',
            'estimated_price' => 'nullable|required_if:status,quoted|numeric|min:0',
            'admin_notes' => 'nullable|string',
        ]);

        $consultation = Consultation::where(
            'consultation_id',
            $consultation
        )->firstOrFail();

        $consultation->update([
            'status' => $validated['status'],
            'estimated_price' => $validated['estimated_price'] ?? null,
            'admin_notes' => $validated['admin_notes'] ?? null,
        ]);

        return response()->json([
            'message' => 'Konsultasi berhasil diperbarui.',
            'consultation' => $consultation,
        ]);
    }
}
