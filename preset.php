<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Preset Name
    |--------------------------------------------------------------------------
    |
    | This is the name of your starter kit that will be displayed in the Laravel
    | installer.
    */
    'name' => 'Kunafa Dashboard',

    /*
    |--------------------------------------------------------------------------
    | Preset Path
    |--------------------------------------------------------------------------
    |
    | Here you may specify which path Laravel should use when installing this
    | starter kit. The path provided here will be used when copying files from
    | this starter kit to your newly-created application.
    */
    'path' => __DIR__,

    /*
    |--------------------------------------------------------------------------
    | Composer Dependencies
    |--------------------------------------------------------------------------
    |
    | Here you may specify which Composer dependencies your starter kit requires.
    | These dependencies will be installed during the Laravel application's
    | creation process.
    */
    'composer_dependencies' => [
        'inertiajs/inertia-laravel:^1.0',
        'tightenco/ziggy:^2.0',
    ],

    /*
    |--------------------------------------------------------------------------
    | NPM Dependencies
    |--------------------------------------------------------------------------
    |
    | Here you may specify which NPM dependencies your starter kit requires.
    | These dependencies will be installed during the Laravel application's
    | creation process.
    */
    'npm_dependencies' => [
        '@inertiajs/vue3' => '^1.0.14',
        '@tailwindcss/forms' => '^0.5.7',
        '@tailwindcss/typography' => '^0.5.10',
        '@vitejs/plugin-vue' => '^5.0.4',
        '@vue/tsconfig' => '^0.5.1',
        'autoprefixer' => '^10.4.17',
        'class-variance-authority' => '^0.7.0',
        'clsx' => '^2.1.0',
        'postcss' => '^8.4.35',
        'shadcn-vue' => '^0.1.0',
        'tailwind-merge' => '^2.2.1',
        'tailwindcss' => '^3.4.1',
        'tailwindcss-animate' => '^1.0.7',
        'typescript' => '^5.3.3',
        'vue' => '^3.4.19',
        'ziggy-js' => '^1.8.1',
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
        'vue-chart-3' => '^3.1.8',
        'vue-flatpickr-component' => '^11.0.3',
        'vue-i18n' => '^9.11.0',
        'vue3-easy-data-table' => '^1.5.47',
        '@iconify/vue' => '^4.1.1',
    ],

    /*
    |--------------------------------------------------------------------------
    | NPM Dev Dependencies
    |--------------------------------------------------------------------------
    |
    | Here you may specify which NPM development dependencies your starter kit
    | requires. These dependencies will be installed during the Laravel
    | application's creation process.
    */
    'npm_dev_dependencies' => [
        '@types/node' => '^20.11.16',
        '@vue/compiler-sfc' => '^3.4.18',
        'eslint' => '^8.56.0',
        'prettier' => '^3.2.5',
        'radix-vue' => '^1.3.2',
        'vite' => '^5.1.3',
        'vue-tsc' => '^1.8.27',
    ],

    /*
    |--------------------------------------------------------------------------
    | Installation Hook
    |--------------------------------------------------------------------------
    |
    | Here you may define a hook that will be executed after the starter kit
    | has been installed.
    */
    'install_hook' => function ($console) {
        // Create the HandleInertiaRequests middleware
        installInertiaMiddleware();
        
        // Copy stub files
        copy_starter_kit_stubs(__DIR__.'/stubs');

        // Install and build npm dependencies
        $console->comment('Installing and building NPM dependencies...');
        $console->newLine();

        $commands = [
            'npm install',
            'npm run build',
        ];

        foreach ($commands as $command) {
            $process = new Symfony\Component\Process\Process(explode(' ', $command), null, null, null, null);

            if ('\\' !== DIRECTORY_SEPARATOR && file_exists('/dev/tty') && is_readable('/dev/tty')) {
                $process->setTty(true);
            }

            $process->run(function ($type, $line) use ($console) {
                $console->write($line);
            });
        }

        $console->newLine();
        $console->comment('Kunafa Dashboard installed successfully!');
    },
];

/**
 * Install the Inertia middleware
 *
 * @return void 
 */
function installInertiaMiddleware()
{
    $handlerPath = app_path('Http/Middleware/HandleInertiaRequests.php');
    
    if (!file_exists($handlerPath)) {
        $dir = dirname($handlerPath);
        
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        
        file_put_contents($handlerPath, <<<'EOT'
<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
            'appName' => config('app.name'),
        ]);
    }
}
EOT
        );
        
        // Register the middleware in the kernel
        $kernelPath = app_path('Http/Kernel.php');
        if (file_exists($kernelPath)) {
            $content = file_get_contents($kernelPath);
            
            if (!str_contains($content, '\App\Http\Middleware\HandleInertiaRequests::class')) {
                $pattern = '/protected \$middlewareGroups = \[\s*\'web\' => \[\s*/';
                $replacement = "protected \$middlewareGroups = [\n        'web' => [\n            \App\Http\Middleware\HandleInertiaRequests::class,\n            ";
                
                $content = preg_replace($pattern, $replacement, $content);
                file_put_contents($kernelPath, $content);
            }
        }
    }
}

/**
 * Copy the starter kit stubs to the application.
 *
 * @param  string  $stubsDirectory
 * @return void
 */
function copy_starter_kit_stubs($stubsDirectory)
{
    // Create directories if they don't exist
    $directories = [
        resource_path('js'),
        resource_path('js/components'),
        resource_path('js/layouts'),
        resource_path('js/pages'),
        resource_path('css'),
        resource_path('views'),
        app_path('Http/Controllers/Auth'),
    ];

    foreach ($directories as $directory) {
        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }
    }

    // Copy stubs to appropriate locations
    copy_directory($stubsDirectory.'/js', resource_path('js'));
    copy_directory($stubsDirectory.'/css', resource_path('css'));
    copy_directory($stubsDirectory.'/views', resource_path('views'));
    copy_directory($stubsDirectory.'/app/Http/Controllers/Auth', app_path('Http/Controllers/Auth'));
    copy_directory($stubsDirectory.'/config', config_path());
    copy($stubsDirectory.'/vite.config.ts', base_path('vite.config.ts'));
    copy($stubsDirectory.'/tsconfig.json', base_path('tsconfig.json'));
    copy($stubsDirectory.'/components.json', base_path('components.json'));

    // Generate Ziggy routes file
    if (file_exists(base_path('artisan'))) {
        exec('php artisan ziggy:generate ' . resource_path('js/ziggy.generated.js'));
    }
}

/**
 * Copy a directory from one location to another.
 *
 * @param  string  $source
 * @param  string  $destination
 * @return void
 */
function copy_directory($source, $destination)
{
    if (! is_dir($source)) {
        return;
    }

    if (! is_dir($destination)) {
        mkdir($destination, 0755, true);
    }

    $dir = opendir($source);

    while (($file = readdir($dir)) !== false) {
        if ($file === '.' || $file === '..') {
            continue;
        }

        $sourcePath = $source.'/'.$file;
        $destPath = $destination.'/'.$file;

        if (is_dir($sourcePath)) {
            copy_directory($sourcePath, $destPath);
        } else {
            copy($sourcePath, $destPath);
        }
    }

    closedir($dir);
}