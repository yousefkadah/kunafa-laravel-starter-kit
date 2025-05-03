import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { i18n } from './libs/i18n';
import IconifyPlugin from './plugins/iconifyPlugin';

// Import CSS
import '../css/style.scss';                     

// Create app
const app = createApp(App);

// Use plugins
app.use(router);
app.use(createPinia());
app.use(i18n);
app.use(IconifyPlugin);

// Mount app
app.mount('#app');
