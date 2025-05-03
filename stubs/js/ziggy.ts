import { Ziggy } from './ziggy.generated';
import route from 'ziggy-js';

export { Ziggy };

export const ZiggyVue = {
    install: (app: any) => {
        app.config.globalProperties.$route = route;
        app.provide('route', route);
    }
};