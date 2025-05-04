import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import tailwindcss from "@tailwindcss/vite";
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import vueform from '@vueform/vueform/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.ts'],
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        vueform(),
        VueI18nPlugin({
            include: path.resolve(__dirname, './resources/js/i18n/locales'),
            fullInstall: true,
            compositionOnly: false,
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
            '~': path.resolve(__dirname, './'),
            '@components': path.resolve(__dirname, './resources/js/components'),
            '@services': path.resolve(__dirname, './resources/js/services'),
            '@utils': path.resolve(__dirname, './resources/js/utils'),
            '@pages': path.resolve(__dirname, './resources/js/pages'),
        },
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true,
        }
    }
});
