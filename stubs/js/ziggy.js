// ziggy.js
import { Ziggy } from './ziggy.generated';
import route from 'ziggy-js';

export { Ziggy };

// Creating a Vue plugin for Ziggy
export const ZiggyVue = {
    install: (app) => {
        app.config.globalProperties.$route = route;
        app.provide('route', route);
    }
};