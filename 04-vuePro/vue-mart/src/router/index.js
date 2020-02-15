import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Cart from '../views/Cart.vue'

import History from '../utils/history'
// vimp
Vue.use(VueRouter)
Vue.use(History)

VueRouter.prototype.goBack = function () {
  this.isBack = true;
  this.back();
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // 路由守卫的配置
  {
    path: '/about',
    name: 'About',
    meta: {
      // 传递进标识
      auth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  // 配置购物车
  {
    path: '/cart',
    name: "cart",
    component: Cart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 路由守卫
// 如果to的auth字段是true,就做验证
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    //需要登录
    //令牌验证的机制
    // 假设已经登录
    const token = localStorage.getItem('token');
    if (token) {
      next()
    } else {
      // const toast = this.$createToast({
      //   // time: 1000,
      //   txt: '转到登录页',
      //   mask: true
      // })
      // toast.show()


      // setTimeout(() => {
      //   toast.hide()

      next({
        path: '/login',
        // 登录成功之后的回参,登录之后会自动跳到那个页面
        query: { redirect: to.path }
      })

      // }, 2000)


    }
  } else {
    next()
  }
})


router.afterEach((to, from) => {
  if (router.isBack) {
    History.pop();
    router.isBack = false;
    router.transitionName = "route-back";
  } else {
    History.push(to.path);
    router.transitionName = "route-forward"
  }
})
export default router
