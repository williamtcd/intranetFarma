import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login-view.vue'
import Home from '@/views/Home-default.vue'
import calculadoraPrecos from '@/views/calculadora-precos.vue'
import Caixa from '@/views/Caixa.vue'
import PowerBi from '@/views/Power-bi.vue'
import Error404 from '@/views/Error-404.vue'
import ListaClientes from '@/views/receita-digital/lista-clientes.vue'
import api from '@/api/api.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/intranet/home',
      name: 'home',
      component: Home
    },
    {
      path: '/intranet/calculadora-precos',
      name: 'calculadora-precos',
      component: calculadoraPrecos
    },
    {
      path: '/intranet/caixa',
      name: 'caixa',
      component: Caixa
    },
    {
      path: '/intranet/powerbi',
      name: 'powerbi',
      component: PowerBi
    },
    {
      path: '/intranet/lista-clientes',
      name: 'lista-clientes',
      component: ListaClientes
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: Error404
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && api.checkStatus() === false) next({ name: 'login' })
  else if (to.name === 'login' && api.checkStatus() === true) next({ name: 'home' })
  else next()
})

export default router
