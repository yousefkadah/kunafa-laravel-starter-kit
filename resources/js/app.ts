import '../css/app.css';

// SIMPLIFIED DARK MODE IMPLEMENTATION
// This is a clean implementation with no dependencies
(() => {
  // Define elements we'll work with
  const html = document.documentElement;
  const body = document.body;
  
  // For debugging
  let debugMode = false;
  const log = (...args) => {
    if (debugMode) console.log('[Theme]', ...args);
  };
  
  // Function to determine if user preference is dark
  function isSystemDarkMode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  
  // Function to get saved mode from localStorage
  function getSavedMode() {
    const savedMode = localStorage.getItem('themeMode');
    log('Saved mode:', savedMode);
    return savedMode;
  }
  
  // Function to set saved mode in localStorage
  function setSavedMode(mode) {
    log('Setting mode to:', mode);
    localStorage.setItem('themeMode', mode);
  }
  
  // Function to apply dark mode
  function applyDarkMode(isDark) {
    log('Applying dark mode:', isDark);
    
    if (isDark) {
      html.classList.add('dark');
      body.classList.add('dark');
      html.style.colorScheme = 'dark';
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
      html.style.colorScheme = 'light';
    }
  }

  // Function to initialize theme on page load
  function initializeTheme() {
    log('Initializing theme');
    const savedMode = getSavedMode();
    
    switch (savedMode) {
      case 'dark':
        applyDarkMode(true);
        break;
      case 'light':
        applyDarkMode(false);
        break;
      default:
        // If no saved preference, use system preference
        applyDarkMode(isSystemDarkMode());
        break;
    }
  }

  // Global toggle function that's extremely simple
  window.toggleTheme = function() {
    log('Toggle theme called');
    const isDark = html.classList.contains('dark');
    const newMode = isDark ? 'light' : 'dark';
    
    applyDarkMode(!isDark);
    setSavedMode(newMode);
    
    // Dispatch a custom event for components that need to react
    window.dispatchEvent(new CustomEvent('theme-changed', {
      detail: { isDark: !isDark }
    }));
    
    return !isDark;
  };
  
  // Watch for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    log('System preference changed', e.matches);
    const savedMode = getSavedMode();
    
    // Only apply system preference if user hasn't set a preference
    if (!savedMode) {
      applyDarkMode(e.matches);
    }
  });
  
  // Initialize theme immediately
  initializeTheme();
})();

// Rest of your app imports
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { ZiggyVue } from 'ziggy-js';
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
