import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ToolsView from '@/views/ToolsView.vue'
import CustomQRView from '@/views/CustomQRView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tools',
      name: 'tools',
      component: ToolsView,
      children: [
        {
          path: 'qrgenerator',
          name: 'qr-generator',
          component: CustomQRView,
        },
      ]
    },
  ],
})

export default router
