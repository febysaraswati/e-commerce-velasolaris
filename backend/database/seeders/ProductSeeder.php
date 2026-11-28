<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $category = Category::firstOrCreate(
            ['category' => 'PLTS Off-Grid Hybrid'],
            [
                'description' => 'Paket sistem PLTS Off-Grid Hybrid VelaSolaris.',
            ]
        );

        $products = [
            [
                'name' => 'Paket PLTS 2.600 Wp',
                'slug' => 'paket-plts-2600-wp',
                'description' => 'Paket PLTS Off-Grid Hybrid dengan kapasitas panel surya 2.600 Wp.',
                'price' => 75000000,
                'stock' => 0,
                'img' => null,
                'specifications' => [
                    'panel' => 'Monocrystalline Tier 1 650W',
                    'jumlah_panel' => 4,
                    'baterai' => 'LiFePO4 Smart BMS 51.2V 100Ah',
                    'jumlah_baterai' => 1,
                    'inverter' => 'High Frequency 6300 VA',
                    'jumlah_inverter' => 1,
                ],
                'energy_per_day' => 11.2,
                'estimated_savings_month' => 487000,
            ],
            [
                'name' => 'Paket PLTS 3.900 Wp',
                'slug' => 'paket-plts-3900-wp',
                'description' => 'Paket PLTS Off-Grid Hybrid dengan kapasitas panel surya 3.900 Wp.',
                'price' => 89000000,
                'stock' => 0,
                'img' => null,
                'specifications' => [
                    'panel' => 'Monocrystalline Tier 1 650W',
                    'jumlah_panel' => 6,
                    'baterai' => 'LiFePO4 Smart BMS 51.2V 200Ah',
                    'jumlah_baterai' => 1,
                    'inverter' => 'High Frequency 6300 VA',
                    'jumlah_inverter' => 1,
                ],
                'energy_per_day' => 16.8,
                'estimated_savings_month' => 860000,
            ],
            [
                'name' => 'Paket PLTS 5.200 Wp',
                'slug' => 'paket-plts-5200-wp',
                'description' => 'Paket PLTS Off-Grid Hybrid dengan kapasitas panel surya 5.200 Wp.',
                'price' => 102000000,
                'stock' => 0,
                'img' => null,
                'specifications' => [
                    'panel' => 'Monocrystalline Tier 1 650W',
                    'jumlah_panel' => 8,
                    'baterai' => 'LiFePO4 Smart BMS 51.2V 200Ah',
                    'jumlah_baterai' => 1,
                    'inverter' => 'High Frequency 6300 VA',
                    'jumlah_inverter' => 1,
                ],
                'energy_per_day' => 22.5,
                'estimated_savings_month' => 1146000,
            ],
            [
                'name' => 'Paket PLTS 6.500 Wp',
                'slug' => 'paket-plts-6500-wp',
                'description' => 'Paket PLTS Off-Grid Hybrid dengan kapasitas panel surya 6.500 Wp.',
                'price' => 131000000,
                'stock' => 0,
                'img' => null,
                'specifications' => [
                    'panel' => 'Monocrystalline Tier 1 650W',
                    'jumlah_panel' => 10,
                    'baterai' => 'LiFePO4 Smart BMS 51.2V 200Ah',
                    'jumlah_baterai' => 1,
                    'inverter' => 'High Frequency 8300 VA',
                    'jumlah_inverter' => 1,
                ],
                'energy_per_day' => 28,
                'estimated_savings_month' => 1432000,
            ],
            [
                'name' => 'Paket PLTS 7.800 Wp',
                'slug' => 'paket-plts-7800-wp',
                'description' => 'Paket PLTS Off-Grid Hybrid dengan kapasitas panel surya 7.800 Wp.',
                'price' => 144000000,
                'stock' => 0,
                'img' => null,
                'specifications' => [
                    'panel' => 'Monocrystalline Tier 1 650W',
                    'jumlah_panel' => 12,
                    'baterai' => 'LiFePO4 Smart BMS 51.2V 280Ah',
                    'jumlah_baterai' => 1,
                    'inverter' => 'High Frequency 8300 VA',
                    'jumlah_inverter' => 1,
                ],
                'energy_per_day' => 33.7,
                'estimated_savings_month' => 1718000,
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(
                ['slug' => $product['slug']],
                array_merge($product, [
                    'category_id' => $category->category_id,
                ])
            );
        }
    }
}
