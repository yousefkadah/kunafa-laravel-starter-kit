<?php

namespace Kunafa\StarterKit\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Process\Process;
use Illuminate\Support\Str;

class InstallCommand extends Command
{
    protected $signature = 'kunafa:install {--composer=global : Absolute path to the Composer binary which should be used to install packages}';

    protected $description = 'Install the Kunafa Dashboard starter kit resources and dependencies';

    public function handle(): void
    {
        $this->info('Installing Kunafa Dashboard...');

        // Install NPM packages
        $this->updateNodePackages(function ($packages) {
            return [
                '@inertiajs/vue3' => '^1.0.0',
                '@inertiajs/inertia' => '^0.11.0',
                '@inertiajs/inertia-vue3' => '^0.6.0',
                '@inertiajs/progress' => '^0.2.7',
                '@intlify/unplugin-vue-i18n' => '^0.13.0',
                '@vueform/vueform' => '^1.9.2',
                '@vueuse/core' => '^10.7.0',
                'chart.js' => '^3.9.1',
                'chartjs-adapter-moment' => '^1.0.1',
                'flatpickr' => '^4.6.13',
                'moment' => '^2.29.4',
                'postcss-import' => '^15.1.0',
                'postcss-nesting' => '^12.0.2',
                'postcss-rtlcss' => '^5.1.0',
                'vue' => '^3.2.20',
                'vue-chart-3' => '^3.1.8',
                'vue-flatpickr-component' => '^11.0.3',
                'vue-i18n' => '^9.11.0',
                'vue-router' => '^4.2.5',
                'vue3-easy-data-table' => '^1.5.47',
                '@iconify/vue' => '^4.1.1',
                '@vitejs/plugin-vue' => '^4.5.2',
                '@vue/compiler-sfc' => '^3.2.20',
                'autoprefixer' => '^10.4.19',
                'postcss' => '^8.4.38',
                'tailwindcss' => '^3.4.17',
                'vite' => '^5.0.6',
                'sass' => '^1.72.0'
            ] + $packages;
        });

        // Configure auth manually instead of using Breeze
        $this->configureAuth();
        
        // Publish configuration
        $this->callSilent('vendor:publish', ['--tag' => 'kunafa-config']);
        
        // Publish assets
        $this->callSilent('vendor:publish', ['--tag' => 'kunafa-assets']);
        
        // Publish views
        $this->callSilent('vendor:publish', ['--tag' => 'kunafa-views']);
        
        // Copy configuration files
        (new Filesystem)->copyDirectory(__DIR__.'/../../stubs/config', base_path('config'));
        
        // Copy Vue setup files
        (new Filesystem)->copyDirectory(__DIR__.'/../../stubs/js', resource_path('js'));
        (new Filesystem)->copyDirectory(__DIR__.'/../../stubs/css', resource_path('css'));
        
        // Copy the authentication views
        (new Filesystem)->copyDirectory(__DIR__.'/../../stubs/auth', resource_path('js/pages/Auth'));
        
        // Copy Vite configuration
        copy(__DIR__.'/../../stubs/vite.config.js', base_path('vite.config.js'));
        
        // Install Inertia middleware
        $this->installInertiaMiddleware();
        
        // Create Blade template
        $this->createBladeTemplate();
        
        $this->info('Kunafa Dashboard installed successfully with authentication components.');
        $this->comment('Please execute the "npm install && npm run dev" command to build your assets.');
    }

    /**
     * Configure authentication manually instead of using Breeze
     */
    protected function configureAuth(): void
    {
        // Create auth controllers directory if it doesn't exist
        $authControllerDir = app_path('Http/Controllers/Auth');
        if (!(new Filesystem)->isDirectory($authControllerDir)) {
            (new Filesystem)->makeDirectory($authControllerDir, 0755, true);
        }
        
        // Copy auth controllers
        (new Filesystem)->copyDirectory(__DIR__.'/../../stubs/app/Http/Controllers/Auth', $authControllerDir);
        
        // Add auth routes
        $this->addAuthRoutes();
        
        // Ensure js/layouts/auth directory exists
        $authLayoutDir = resource_path('js/layouts/auth');
        if (!(new Filesystem)->isDirectory($authLayoutDir)) {
            (new Filesystem)->makeDirectory($authLayoutDir, 0755, true);
        }
        
        // Create auth layout
        (new Filesystem)->copyDirectory(__DIR__.'/../../stubs/js/layouts/auth', $authLayoutDir);
    }
    
    /**
     * Add auth routes to web.php
     */
    protected function addAuthRoutes(): void
    {
        $routesPath = base_path('routes/web.php');
        $routesContent = file_get_contents($routesPath);
        
        // Only add auth routes if they don't already exist
        if (!str_contains($routesContent, 'AuthRoutesRegistrar::routes()')) {
            $authRoutes = <<<'EOT'

// Authentication Routes
use App\Http\Controllers\Auth\AuthRoutesRegistrar;
AuthRoutesRegistrar::routes();

EOT;
            file_put_contents($routesPath, $authRoutes . $routesContent);
        }
    }

    /**
     * Create Blade template
     */
    protected function createBladeTemplate(): void
    {
        // Ensure views directory exists
        if (!(new Filesystem)->isDirectory(resource_path('views'))) {
            (new Filesystem)->makeDirectory(resource_path('views'), 0755, true);
        }
        
        // Copy app.blade.php
        copy(__DIR__.'/../../stubs/views/app.blade.php', resource_path('views/app.blade.php'));
    }

    /**
     * Install Inertia middleware
     */
    protected function installInertiaMiddleware(): void
    {
        $middlewarePath = app_path('Http/Middleware/HandleInertiaRequests.php');
        
        // Ensure the directory exists
        if (!(new Filesystem)->isDirectory(dirname($middlewarePath))) {
            (new Filesystem)->makeDirectory(dirname($middlewarePath), 0755, true);
        }
        
        // Create HandleInertiaRequests middleware if it doesn't exist
        if (!(new Filesystem)->exists($middlewarePath)) {
            (new Filesystem)->copy(
                __DIR__.'/../../stubs/app/Http/Middleware/HandleInertiaRequests.php',
                $middlewarePath
            );
            
            // Register middleware in Kernel.php
            $this->addMiddlewareToKernel();
        }
    }
    
    /**
     * Add middleware to kernel
     */
    protected function addMiddlewareToKernel(): void
    {
        $kernelPath = app_path('Http/Kernel.php');
        
        // Check if Kernel.php exists
        if (!(new Filesystem)->exists($kernelPath)) {
            $this->warn('Kernel.php not found. Attempting to locate it...');
            
            // Try to find Kernel.php in the app directory
            if ((new Filesystem)->exists(base_path('app/Http/Kernel.php'))) {
                $kernelPath = base_path('app/Http/Kernel.php');
            } else {
                $this->warn('Kernel.php not found in the expected locations. Skipping middleware registration.');
                return;
            }
        }
        
        $kernelContents = file_get_contents($kernelPath);
        
        if (!str_contains($kernelContents, '\App\Http\Middleware\HandleInertiaRequests::class')) {
            $pattern = '/protected \$middlewareGroups = \[\s*\'web\' => \[\s*/';
            $replacement = "protected \$middlewareGroups = [\n        'web' => [\n            \App\Http\Middleware\HandleInertiaRequests::class,\n            ";
            
            $updatedKernelContents = preg_replace($pattern, $replacement, $kernelContents);
            file_put_contents($kernelPath, $updatedKernelContents);
        }
    }

    /**
     * Update the "package.json" file.
     */
    protected function updateNodePackages(callable $callback, $dev = true): void
    {
        if (! file_exists(base_path('package.json'))) {
            return;
        }

        $configurationKey = $dev ? 'devDependencies' : 'dependencies';

        $packages = json_decode(file_get_contents(base_path('package.json')), true);

        $packages[$configurationKey] = $callback(
            array_key_exists($configurationKey, $packages) ? $packages[$configurationKey] : [],
            $configurationKey
        );

        ksort($packages[$configurationKey]);

        file_put_contents(
            base_path('package.json'),
            json_encode($packages, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT).PHP_EOL
        );
    }
}
