<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id('product_id');

            $table->unsignedBigInteger('category_id');

            $table->string('name', 150);
            $table->string('slug')->unique();
            $table->text('description')->nullable();

            $table->decimal('price', 15, 2);
            $table->unsignedInteger('stock')->default(0);

            $table->string('img')->nullable();

            $table->text('specifications')->nullable();

            $table->decimal('energy_per_day', 10, 2)->nullable();
            $table->decimal('estimated_savings_month', 15, 2)->nullable();

            $table->timestamps();

            $table->foreign('category_id')
                ->references('category_id')
                ->on('categories')
                ->cascadeOnUpdate()
                ->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};