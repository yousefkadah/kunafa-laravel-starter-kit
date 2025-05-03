import { Ziggy } from './ziggy.generated';
import route from 'ziggy-js';
import { App } from 'vue';

export { Ziggy };

export const ZiggyVue = {
    install: (app: App): void => {
        app.config.globalProperties.$route = route;
        app.provide('route', route);
    }
};