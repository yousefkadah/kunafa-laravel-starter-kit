import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from 'ziggy';
import { i18n } from './libs/i18n';
import IconifyPlugin from './plugins/iconifyPlugin';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Kunafa Dashboard';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob('./pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });
        
        app.use(plugin)
           .use(ZiggyVue)
           .use(i18n)
           .use(IconifyPlugin);
        
        app.config.errorHandler = (error, instance, info) => {
            console.error('Global error:', error);
            console.error('Error instance:', instance);
            console.error('Error info:', info);
        };
        
        app.mount(el);
    },
    progress: {
        color: 'hsl(var(--primary))',
    },
});