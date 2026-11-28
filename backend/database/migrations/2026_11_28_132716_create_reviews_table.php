<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id('review_id');

            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->unsignedBigInteger('product_id');

            $table->foreign('product_id')
                ->references('product_id')
                ->on('products')
                ->cascadeOnDelete();

            $table->unsignedBigInteger('order_id');

            $table->foreign('order_id')
                ->references('order_id')
                ->on('orders')
                ->cascadeOnDelete();

            $table->tinyInteger('rating');

            $table->text('review')->nullable();

            $table->timestamps();

            // Satu customer hanya boleh mengulas satu produk sekali
            $table->unique(
                ['user_id', 'product_id'],
                'reviews_user_product_unique'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
