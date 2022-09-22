import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "./stores/user";

// psudo middleware
const requireAuth = async(to, from, next) => {
    const userStore = useUserStore()
    userStore.loadingSession = true

    const user = await userStore.currentUser()
    user ? next() : next('/login')

    userStore.loadingSession = false
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./view/Home.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/editar/:id',
      name: 'editar',
      component: () => import('./view/Editar.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./view/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./view/Register.vue')
    },

  ]
})

export default router
