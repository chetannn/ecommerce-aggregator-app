import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Auth from '../components/layouts/Auth.vue'
import Default from '../components/layouts/Default.vue'
import Profile from '../views/profile/Index.vue'
import Products from '../views/products/Index.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/auth',
    component: Auth,
    meta: {
      title: 'Login'
    },
    children: [{
      path: 'login',
      name: 'login',
      component: Login
    }, {
      path: 'register',
      name: 'register',
      component: Register
    }]
  },
  {
    path: '/',
    name: 'home',
    component: Default,
    redirect: '/products',
    meta: {
      requiresAuth: true
    },
    children: [{
      path: 'products',
      name: 'products',
      component: Products
    }, {
      path: 'profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    }]
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if(!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
     next()
  }
  next()
})

export default router
