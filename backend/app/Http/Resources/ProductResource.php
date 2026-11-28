<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->product_id,
            'category_id' => $this->category_id,
            'category' => $this->category?->category,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => (float) $this->price,
            'stock' => (int) $this->stock,
            'img' => $this->img,
            'img_url' => $this->img
                ? url('storage/' . $this->img)
                : null,
            'specifications' => $this->specifications,
            'energy_per_day' => $this->energy_per_day,
            'estimated_savings_month' => $this->estimated_savings_month,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
