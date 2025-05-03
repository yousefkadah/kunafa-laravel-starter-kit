<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Kunafa Dashboard Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains the configuration settings for your Kunafa Dashboard.
    |
    */

    // Application settings
    'name' => env('APP_NAME', 'Kunafa Dashboard'),
    
    // Default language
    'default_locale' => 'en',
    
    // Available languages
    'available_locales' => [
        'en' => 'English',
        'ar' => 'Arabic',
    ],
    
    // RTL languages
    'rtl_locales' => [
        'ar',
    ],
    
    // Default theme color
    'default_theme' => 'light',
];
