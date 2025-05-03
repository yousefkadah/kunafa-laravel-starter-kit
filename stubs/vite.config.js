import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';                        
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/kunafa/style.scss', 'resources/js/kunafa/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        VueI18nPlugin({
            include: [path.resolve(__dirname, './resources/js/kunafa/libs/i18n/locales/**')],
        })
    ],
    resolve: {
        alias: {
            '@': '/resources/js/kunafa',
            '~': '/resources/js/kunafa',
        },
    },
});
