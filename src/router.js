import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '@components/HelloWorld.vue';

const routes = [
  {
    name: 'home',
    path: '/sportova',
    component: HelloWorld,
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
