<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\AdminOrderController;
use App\Http\Controllers\Api\AdminDashboardController;
use App\Http\Controllers\Api\AdminCustomerController;
use App\Http\Controllers\Api\ConsultationController;
use App\Http\Controllers\Api\AdminConsultationController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\AdminReviewController;

// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public: melihat produk dan kategori
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);

Route::get('/products/{product}/reviews', [
    ReviewController::class,
    'productReviews'
]);

// Pengguna yang sudah login
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Cart API - Customer yang sudah login
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);

    Route::put('/cart/items/{cartItem}', [CartController::class, 'update']);

    Route::delete('/cart/items/{cartItem}', [CartController::class, 'destroy']);

    // Checkout dan Pesanan Customer
    Route::post('/checkout', [CheckoutController::class, 'checkout']);

    Route::get('/orders', [CheckoutController::class, 'index']);

    Route::get('/orders/{order}', [CheckoutController::class, 'show']);

    // Konsultasi Customer
    Route::post('/consultations', [
        ConsultationController::class,
        'store'
    ]);

    Route::get('/consultations', [
        ConsultationController::class,
        'index'
    ]);

    Route::get('/consultations/{consultation}', [
        ConsultationController::class,
        'show'
    ]);

    // Review Customer
    Route::post('/reviews', [ReviewController::class, 'store']);

    Route::get('/my-reviews', [ReviewController::class, 'myReviews']);

    Route::put('/reviews/{review}', [ReviewController::class, 'update']);

    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy']);

});

// Khusus Admin
Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::patch('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::patch('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

    // Admin mengelola pesanan
    Route::get('/admin/orders', [AdminOrderController::class, 'index']);

    Route::get('/admin/orders/{order}', [AdminOrderController::class, 'show']);

    Route::patch('/admin/orders/{order}/status', [
        AdminOrderController::class,
        'updateStatus'
    ]);

    Route::patch('/admin/orders/{order}/payment-status', [
        AdminOrderController::class,
        'updatePaymentStatus'
    ]);

    Route::get('/admin/dashboard', [
        AdminDashboardController::class,
        'index'
    ]);

    // Admin melihat data Customer
    Route::get('/admin/customers', [
        AdminCustomerController::class,
        'index'
    ]);

    Route::get('/admin/customers/{customer}', [
        AdminCustomerController::class,
        'show'
    ]);

    // Admin mengelola konsultasi
    Route::get('/admin/consultations', [
        AdminConsultationController::class,
        'index'
    ]);

    Route::get('/admin/consultations/{consultation}', [
        AdminConsultationController::class,
        'show'
    ]);

    Route::patch('/admin/consultations/{consultation}', [
        AdminConsultationController::class,
        'update'
    ]);

    // Admin mengelola review
    Route::get('/admin/reviews', [AdminReviewController::class, 'index']);

    Route::get('/admin/reviews/{review}', [AdminReviewController::class, 'show']);

    Route::delete('/admin/reviews/{review}', [AdminReviewController::class, 'destroy']);

});
