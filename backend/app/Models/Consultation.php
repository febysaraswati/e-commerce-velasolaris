<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Consultation extends Model
{
    protected $primaryKey = 'consultation_id';

    protected $fillable = [
        'user_id',
        'product_id',
        'product_name',
        'customer_name',
        'email',
        'phone',
        'address',
        'city',
        'province',
        'system_type',
        'monthly_electricity_bill',
        'message',
        'status',
        'estimated_price',
        'admin_notes',
    ];

    protected function casts(): array
    {
        return [
            'monthly_electricity_bill' => 'decimal:2',
            'estimated_price' => 'decimal:2',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(
            Product::class,
            'product_id',
            'product_id'
        );
    }
}
