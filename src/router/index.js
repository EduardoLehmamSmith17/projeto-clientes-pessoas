import { createRouter, createWebHistory } from 'vue-router'
import LegalPersonView from '../views/LegalPersonView/LegalPersonView.vue'
import PhysycalPersonView from '../views/PhysicalPersonView/PhysicalPersonView.vue'

const routes = [
  {
    path: '/legalPerson', 
    name: 'legalPerson',
    component: LegalPersonView
  },
  {
    path: '/physicalPerson',
    name: 'physicalPerson',
    component: PhysycalPersonView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router