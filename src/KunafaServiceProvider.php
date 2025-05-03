<?php

namespace Kunafa\StarterKit;

use Illuminate\Support\ServiceProvider;

class KunafaServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->mergeConfigFrom(
            __DIR__.'/../config/kunafa.php', 'kunafa'
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->loadRoutesFrom(__DIR__.'/routes/web.php');
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'kunafa');
        
        // Publish configuration
        $this->publishes([
            __DIR__.'/../config/kunafa.php' => config_path('kunafa.php'),
        ], 'kunafa-config');
        
        // Publish assets
        $this->publishes([
            __DIR__.'/../resources/js' => resource_path('js/kunafa'),
            __DIR__.'/../resources/css' => resource_path('css/kunafa'),
            __DIR__.'/../resources/images' => resource_path('images'),
        ], 'kunafa-assets');
        
        // Publish views
        $this->publishes([
            __DIR__.'/../resources/views' => resource_path('views/vendor/kunafa'),
        ], 'kunafa-views');
        
        if ($this->app->runningInConsole()) {
            $this->commands([
                Commands\InstallCommand::class,
            ]);
        }
    }
}
