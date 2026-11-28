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
        Schema::create('consultations', function (Blueprint $table) {
            $table->id('consultation_id');

            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->unsignedBigInteger('product_id')->nullable();

            // Snapshot nama produk jika Customer memilih paket
            $table->string('product_name')->nullable();

            $table->string('customer_name', 150);
            $table->string('email');
            $table->string('phone', 30);

            $table->text('address')->nullable();
            $table->string('city', 100)->nullable();
            $table->string('province', 100)->nullable();

            $table->string('system_type', 100)->nullable();
            $table->decimal('monthly_electricity_bill', 15, 2)->nullable();

            $table->text('message')->nullable();

            $table->string('status', 30)->default('pending');

            $table->decimal('estimated_price', 15, 2)->nullable();
            $table->text('admin_notes')->nullable();

            $table->timestamps();

            $table->foreign('product_id')
                ->references('product_id')
                ->on('products')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultations');
    }
};
