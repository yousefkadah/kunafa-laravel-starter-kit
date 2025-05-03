import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from './ziggy';
import { i18n } from '@/libs/i18n';
import Vueform from '@vueform/vueform';
import vueformConfig from '../../config/vueform.config';
import { IconifyIconOffline, IconifyIconOnline, IconifyIconJSON } from '@iconify/vue';
import VueEasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import '@/css/additional-styles/iconify-custom.scss';
import '../css/style.scss';

createInertiaApp({
  title: (title) => `${title} - Kunafa Dashboard`,
  resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob('./pages/**/*.vue')),
  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) });
    
    app.use(plugin)
      .use(ZiggyVue)
      .use(i18n)
      .use(Vueform, vueformConfig);
    
    app.component('EasyDataTable', VueEasyDataTable);
    app.component('IconifyIconOffline', IconifyIconOffline);
    app.component('IconifyIconOnline', IconifyIconOnline);
    app.component('IconifyIconJSON', IconifyIconJSON);
    
    app.mount(el);
  },
  progress: {
    color: '#4B5563',
  },
});
