import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@views/HomeView.vue';

const routes = [
  {
    name: 'home',
    path: '/sportova',
    component: HomeView,
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/sportova',
  },
];

export default createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes,
});
