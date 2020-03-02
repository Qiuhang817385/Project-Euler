import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios/axios';


import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd)
// Vue.component(message.name, message);

Vue.config.productionTip = false
//执行拦截器

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
axios(app)
