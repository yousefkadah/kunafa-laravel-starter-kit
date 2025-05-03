<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Route;

class AuthRoutesRegistrar
{
    /**
     * Register the authentication routes.
     *
     * @return void
     */
    public static function routes()
    {
        // Login Routes
        Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
        Route::post('login', [LoginController::class, 'login']);
        Route::post('logout', [LoginController::class, 'logout'])->name('logout');

        // Registration Routes
        Route::get('register', [RegisterController::class, 'showRegistrationForm'])->name('register');
        Route::post('register', [RegisterController::class, 'register']);
    }
}