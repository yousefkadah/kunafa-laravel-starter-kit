<?php

use Illuminate\Support\Facades\Route;
use Kunafa\StarterKit\Http\Controllers\DashboardController;

Route::middleware(['web'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('kunafa.dashboard');
});
