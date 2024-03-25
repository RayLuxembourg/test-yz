import { createRouter, createWebHistory } from 'vue-router'
import GettingStartedView from '../views/GettingStartedView.vue';
import ChartsView from '../views/ChartsView.vue';
import ChartsConnectedView from '../views/ChartsConnectedView.vue';
import FiltersView from '../views/FiltersView.vue';
import DashboardView from '../views/DashboardView.vue';
import BlogView from '../views/BlogView.vue';
import PenguinsView from '../views/PenguinsView.vue';
import WaferMapsView from '../views/WaferMapsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GettingStartedView
    },
    {
      path: '/charts',
      name: 'charts',
      component: ChartsView
    },
    {
      path: '/charts-connected',
      name: 'charts-connected',
      component: ChartsConnectedView
    },
    {
      path: '/filters',
      name: 'filters',
      component: FiltersView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView
    },
    {
      path: '/penguins',
      name: 'penguins',
      component: PenguinsView
    },
    {
      path: '/wafermaps',
      name: 'wafermaps',
      component: WaferMapsView
    }
  ]
})

export default router
