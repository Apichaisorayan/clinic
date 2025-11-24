import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Calendar from '../views/Calendar.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
    meta: { requiresAuth: true }
  },
  {
    path: '/rooms',
    name: 'RoomManagement',
    component: () => import('../views/RoomManagement.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Route guard for authentication and authorization
router.beforeEach((to, from, next) => {
  // Use sessionStorage for tab-specific authentication
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'
  const user = sessionStorage.getItem('user')
  const tabId = sessionStorage.getItem('tabId')
  
  let userRole = null
  let validSession = false
  
  if (user && tabId && isLoggedIn) {
    try {
      const userData = JSON.parse(user)
      if (userData.tabId === tabId) {
        userRole = userData.role
        validSession = true
      }
    } catch (error) {
      console.error('Router - Error parsing user data:', error)
    }
  }
  
  console.log('Router Guard - Path:', to.path, 'Valid Session:', validSession, 'Role:', userRole, 'TabID:', tabId)
  
  if (to.meta.requiresAuth && !validSession) {
    // Redirect to login if trying to access protected route without valid session
    console.log('Router - Redirecting to login (no valid session)')
    next('/login')
  } else if (to.meta.requiresAdmin && userRole !== 'ADMIN') {
    // Redirect to dashboard if trying to access admin route without admin role
    console.log('Router - Redirecting to dashboard (not admin)')
    next('/dashboard')
  } else if ((to.name === 'Login' || to.name === 'Register') && validSession) {
    // Redirect to dashboard if already logged in and trying to access login/register
    console.log('Router - Redirecting to dashboard (already logged in)')
    next('/dashboard')
  } else {
    next()
  }
})

export default router
