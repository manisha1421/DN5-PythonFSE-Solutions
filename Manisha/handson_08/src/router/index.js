import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CoursesView from '../views/CoursesView.vue'
import ProfileView from '../views/ProfileView.vue'
import CourseDetailView from '../views/CourseDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/courses', component: CoursesView },
    { path: '/courses/:id', component: CourseDetailView },
    { path: '/profile', component: ProfileView }
  ]
})

// Navigation guard
router.beforeEach((to) => {
  console.log('Navigating to:', to.path)
})

export default router