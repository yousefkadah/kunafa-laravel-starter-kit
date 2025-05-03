<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Preset Name
    |--------------------------------------------------------------------------
    |
    | This value is the name of the preset. This value is used when the
    | framework needs to place the application's name in a notification or
    | any other location as required by the application or its packages.
    |
    */
    'name' => 'Kunafa Dashboard',
    
    /*
    |--------------------------------------------------------------------------
    | Base Path
    |--------------------------------------------------------------------------
    |
    | This value is the base path of the preset. This is used when the preset
    | is copied over. The path may be relative to the preset's directory.
    |
    */
    'base_path' => '',
    
    /*
    |--------------------------------------------------------------------------
    | Export Path
    |--------------------------------------------------------------------------
    |
    | This value is the path where the preset should be exported to. This is
    | used when the preset is copied over. The path may be relative to the
    | base installation directory.
    |
    */
    'export_path' => '',
    
    /*
    |--------------------------------------------------------------------------
    | Installation Hook
    |--------------------------------------------------------------------------
    |
    | This value represents the installation hook that will be fired
    | after the preset is installed.
    |
    */
    'install_hook' => function ($console) {
        // Replace AppServiceProvider with your custom service provider
        $console->call('vendor:publish', [
            '--provider' => 'Kunafa\\StarterKit\\KunafaServiceProvider',
            '--force' => true,
        ]);
        
        // Install Laravel Breeze for auth scaffolding
        $console->info('Installing Laravel Breeze...');
        $console->call('composer:require', [
            'laravel/breeze:^1.28',
        ]);
        
        // Run the Kunafa installation command
        $console->info('Installing Kunafa Dashboard...');
        $console->call('kunafa:install');
        
        // Run database migrations
        $console->info('Running migrations...');
        $console->call('migrate');
        
        // Install NPM dependencies and build assets
        $console->info('Installing and building frontend assets...');
        if (file_exists(base_path('package.json'))) {
            $console->call('npm:install');
            $console->call('npm:build');
        }
        
        $console->info('Kunafa Dashboard installed successfully with authentication components.');
    },
];