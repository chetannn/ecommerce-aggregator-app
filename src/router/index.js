import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

import RegisterExperimental from '../views/RegisterExperimental.vue'
import Login from '../views/Login.vue'
import Auth2 from '../components/layouts/Auth2.vue'
import Default from '../components/layouts/Default.vue'
import Profile from '../views/profile/Index.vue'
import Products from '../views/products/Index.vue'
import Admin from '@/components/layouts/Admin.vue'
import Dashboard from '@/views/admin/dashboard/Dashboard.vue'
import Sources from '@/views/admin/source/Index.vue'
import Users from '@/views/admin/user/Index.vue'
import Favorite from '@/views/favorite/Index.vue'
import LoginExp from '@/views/LoginExperimental.vue'
import ProductManagement from '@/views/admin/productManagement/Index.vue'
import AdminFavorite from '@/views/admin/favorite/Index.vue'
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
    component: Auth2,
    meta: {
      title: 'Login'
    },
    children: [{
      path: 'login',
      name: 'login',
      component: LoginExp
    }, {
      path: 'register',
      name: 'register',
      component: RegisterExperimental
    }, {
      path: 'loginExp',
      name: 'loginExp',
      component: LoginExp
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
    }, {
      path: 'favorites',
      name: 'favorites',
      component: Favorite,
      meta: {
        requiresAuth: true
      }
    }]
  },
  {
    path: '/admin',
    redirect: '/dashboard',
    component: Admin,
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    }, {
      path: 'source',
      name: 'source',
      component: Sources,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    }, {
      path: 'users',
      name: 'users',
      component: Users,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    }, {
      path: 'productManagement',
      name: 'productManagement',
      component: ProductManagement,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    }, {
      path: 'favorites',
      name: 'adminFavorites',
      component: AdminFavorite,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    }]
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth && record.meta.isAdmin)) {
    if(!(store.getters['auth/authenticated'] && store.getters['auth/authenticated'].isAdmin)) {
      return next({
        name: 'home'
      })
    }
    next()
  }
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

router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
});


router.afterEach((to, from) => {
  NProgress.done()
})

export default router
