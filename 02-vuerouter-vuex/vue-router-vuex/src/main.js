import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './routes/routes';
import store from './store/store';
Vue.config.productionTip = false
Vue.use(Vuex);

// to,到哪去,from,从哪来,必须有next
router.beforeEach((to, from, next) => {
  // 可以用来做校验
  next()
})
// 作用和上面一样,就一点不一样,触发的时机不一样,比上面的晚一点点
router.beforeResolve((to, from, next) => {
  next()
})
router.afterEach((to, from) => {

})

new Vue({
  router,//名字必须是router
  store,
  render: h => h(App),
}).$mount('#app')
