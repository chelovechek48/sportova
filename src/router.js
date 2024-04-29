import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@views/HomeView.vue';
import ItemCardView from '@views/ItemCardView.vue';

const routes = [
  {
    name: 'home',
    path: '/sportova',
    component: HomeView,
  },
  {
    name: 'item',
    path: '/sportova/item',
    component: ItemCardView,
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
