import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@views/HomeView.vue';
import CatalogView from '@views/CatalogView.vue';
import ItemCardView from '@views/ItemCardView.vue';

const root = 'sportova';
const routes = [
  {
    name: 'home',
    path: `/${root}`,
    component: HomeView,
  },
  {
    name: 'catalog',
    path: `/${root}/catalog`,
    component: CatalogView,
    meta: {
      breadcrumbs: [
        { path: { name: 'home' }, text: 'Главная' },
        { path: { name: 'catalog' }, text: 'Каталог' },
      ],
    },
  },
  {
    name: 'item',
    path: `/${root}/item`,
    component: ItemCardView,
    meta: {
      breadcrumbs: [
        { path: { name: 'home' }, text: 'Главная' },
        { path: { name: 'catalog' }, text: 'Каталог' },
      ],
    },
  },
  {
    path: '/:pathMatch(.*)',
    redirect: `/${root}`,
  },
];

export default createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    const isAnchor = to.hash;
    if (isAnchor) {
      return false;
    }

    if (to.path !== from.path) {
      return { top: 0 };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});
