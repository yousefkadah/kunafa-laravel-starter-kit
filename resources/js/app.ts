import '../css/app.css';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { ZiggyVue } from 'ziggy-js';
import { initializeTheme, updateTheme } from './composables/useAppearance';
import { detectRTL } from './services/LanguageService';

// Import dashboard dependencies
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import enUS from './i18n/locales/en.json';
import arAR from './i18n/locales/ar.json';
import VueForm from '@vueform/vueform';
import vueformConfig from '../../vueform.config';

// Extend ImportMeta interface for Vite...
declare module 'vite/client' {
    interface ImportMetaEnv {
        readonly VITE_APP_NAME: string;
        [key: string]: string | boolean | undefined;
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv;
        readonly glob: <T>(pattern: string) => Record<string, () => Promise<T>>;
    }
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Define a global theme manager
window.toggleTheme = () => {
  const isDark = document.documentElement.classList.contains('dark');
  document.documentElement.classList.toggle('dark', !isDark);
  localStorage.setItem('appearance', !isDark ? 'dark' : 'light');
  
  // Force a repaint
  document.body.style.display = 'none';
  document.body.offsetHeight; // Force a reflow
  document.body.style.display = '';
  
  return !isDark;
};

// Initialize language direction based on stored locale
const initializeLanguageDirection = () => {
    const savedLocale = localStorage.getItem('locale') || 'en';
    const isRTL = detectRTL(savedLocale);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLocale;
};

// Run initialization immediately
initializeLanguageDirection();

// Create i18n instance
const i18n = createI18n({
    locale: localStorage.getItem('locale') || 'en',
    fallbackLocale: 'en',
    legacy: false,
    messages: {
        en: enUS,
        ar: arAR
    }
});

// Create Pinia store
const pinia = createPinia();

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob<DefineComponent>('./pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(pinia)
            .use(i18n)
            .use(VueForm, vueformConfig)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on page load...
initializeTheme();
