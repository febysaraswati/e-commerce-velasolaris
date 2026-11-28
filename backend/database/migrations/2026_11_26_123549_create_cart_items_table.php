<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id('cart_item_id');

            $table->foreignId('cart_id')
                ->constrained('carts', 'cart_id')
                ->cascadeOnDelete();

            $table->unsignedBigInteger('product_id');

            $table->unsignedInteger('quantity')->default(1);

            $table->timestamps();

            $table->foreign('product_id')
                ->references('product_id')
                ->on('products')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->unique(['cart_id', 'product_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
