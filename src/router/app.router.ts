import { createRouter, createWebHistory } from 'vue-router'
import PortfolioPage from '@/views/portfolio-page.view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'portfolio', component: PortfolioPage },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
