<?php

namespace Kunafa\StarterKit\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Process\Process;

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
        
        // Copy Vite configuration
        copy(__DIR__.'/../../stubs/vite.config.js', base_path('vite.config.js'));
        
        $this->info('Kunafa Dashboard installed successfully.');
        $this->comment('Please execute the "npm install && npm run dev" command to build your assets.');
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
