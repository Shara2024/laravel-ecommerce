<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\SaleController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('auth.sign-up');
})->name('signUp');

Route::post('/signUp', [AuthController::class, 'signUp'])->name('signUp.post');

Route::get('/signIn', function () {
    return view('auth.sign-in');
})->name('signIn');

Route::post('/signIn', [AuthController::class, 'signIn'])->name('signIn.post');

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', function () {
        return view('dashboard.index');
    })->name('dashboard');

    Route::get('/profile', function () {
        return view('profile.index');
    })->name('profile');

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::view('/products', 'product.index')
        ->name('product.index');

    Route::get('/api/products', [ProductController::class, 'index'])
        ->name('product.api.index');

    Route::post('/api/products', [ProductController::class, 'create'])
        ->name('product.create');

    Route::put('/api/products/{product}', [ProductController::class, 'update'])
        ->name('product.update');

    Route::delete('/api/products/{product}', [ProductController::class, 'delete'])
        ->name('product.delete');

    Route::view('/customers', 'customer.index')
        ->name('customers');

    Route::get('/api/customers', [CustomerController::class, 'index'])
        ->name('customers.index');

    Route::post('/api/customers', [CustomerController::class, 'store'])
        ->name('customers.store');

    Route::put('/api/customers/{customer}', [CustomerController::class, 'update'])
        ->name('customers.update');

    Route::delete('/api/customers/{customer}', [CustomerController::class, 'destroy'])
        ->name('customers.destroy');

    Route::view('/sales', 'sale.index')
        ->name('sales');

    Route::get('/api/sales', [SaleController::class, 'index'])
        ->name('sales.index');

    Route::post('/api/sales', [SaleController::class, 'store'])
        ->name('sales.store');

    Route::get('/api/sales/{sale}', [SaleController::class, 'show'])
        ->name('sales.show');

    Route::get('/api/customers/options', [CustomerController::class, 'options'])
        ->name('customers.options');

    Route::get('/api/products/options', [ProductController::class, 'options'])
        ->name('products.options');

    Route::get('/api/customers/search', [CustomerController::class, 'search'])
        ->name('customers.search');

    Route::get('/api/products/search', [ProductController::class, 'search'])
        ->name('products.search');
});
