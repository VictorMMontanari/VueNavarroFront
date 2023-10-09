import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AlunoView from '../views/AlunoView.vue'
import DisciplinaView from '../views/DisciplinaView.vue'
import MatriculaView from '../views/MatriculaView.vue'

import GerenteView from '../views/GerenteView.vue'
import ProgramadorView from '../views/ProgramadorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/aluno',
      name: 'aluno',
      component: AlunoView
    },
    {
      path: '/disciplina',
      name: 'disciplina',
      component: DisciplinaView
    },
    {
      path: '/matricula',
      name: 'matricula',
      component: MatriculaView
    },
    {
      path: '/gerente',
      name: 'gerente',
      component: GerenteView
    },
    {
      path: '/programador',
      name: 'programador',
      component: ProgramadorView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router