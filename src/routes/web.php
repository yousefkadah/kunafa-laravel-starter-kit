<?php

use Illuminate\Support\Facades\Route;
use Kunafa\StarterKit\Http\Controllers\DashboardController;
use Inertia\Inertia;

// Public routes
Route::middleware(['web'])->group(function () {
    // Redirect root to dashboard or login based on auth status
    Route::get('/', function () {
        return auth()->check() 
            ? redirect()->route('dashboard') 
            : redirect()->route('login');
    });

    // Dashboard (protected with auth middleware)
    Route::middleware(['auth'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        
        // Add more authenticated routes here
    });
});

// Note: Auth routes are handled by Laravel Breeze when it's installed
