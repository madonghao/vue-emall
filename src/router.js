import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/index.vue'),
      children: [
        {
          path: 'home',
          component: () => import('./views/home.vue'),
        },
        {
          path: 'category',
          component: () => import('./views/category.vue'),
        },
        {
          path: 'cart',
          component: () => import('./views/cart.vue'),
        },
        {
          path: 'user',
          component: () => import('./views/user.vue'),
        }
      ],
    },
    {
      path: '/categorydetail',
      name: 'categorydetail',
      component: () => import('./views/categoryDetail.vue'),
      meta: {
        keepAlive: true,
        isBack: true,
      }
    },
    {
      path: '/goodsdetail',
      component: () => import('./views/goodsDetail.vue'),
    }
  ]
})
