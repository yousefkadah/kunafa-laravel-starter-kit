import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

// Create router with base URL for Laravel                                integration
const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0 };
  }
});

export default router;
