// Add the Laravel welcome page to the routes
import LaravelWelcome from '../views/demo/LaravelWelcome.vue';

// Import your existing routes
import HomeView from '../views/Home.vue';
// Import other routes as needed

export const routes = [
  {
    path: '/',
    name: 'laravel-welcome',
    component: LaravelWelcome
  },
  {
    path: '/dashboard',
    name: 'home',
    component: HomeView
  },
  // Add your other routes here
];
