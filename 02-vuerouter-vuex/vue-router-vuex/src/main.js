import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './routes/routes';
import store from './store/store';
Vue.config.productionTip = false
Vue.use(Vuex);
new Vue({
  router,//名字必须是router
  store,
  render: h => h(App),
}).$mount('#app')
