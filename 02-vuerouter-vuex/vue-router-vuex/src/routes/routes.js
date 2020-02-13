import Vue from 'vue';
import VueRouter from 'vue-router'
import Page1 from '../components/Page1'
import Page2 from '../components/Page2'
import Page3 from '../components/Page3'
import PageChild3 from '../components/PageChild3.vue'
Vue.use(VueRouter)
export default new VueRouter({
  mode: "history",
  routes: [
    // 重定向
    { name: 'home', path: '/', redirect: '/a' },
    {
      name: 'page1', path: '/page1', component: Page1,
      // beforeEnter: (to, from, next) => {
      //   next()
      // }
    },
    // 这种方式必须得带参数才可以
    // http://localhost:8888/page2/12 必须是这种方式
    { name: 'page2', path: '/page2/:id', component: Page2 },
    {
      name: 'page3',
      path: '/page3',
      component: Page3,
      children: [
        { path: 'PageChild3', component: PageChild3 }
      ]
    },
  ]
})