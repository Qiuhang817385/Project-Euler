import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios/axios';

// 引入Vant
// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use(Vant);

// 引入antd-vue-UI框架  只有Cart.vue里面的$message用到了antd组件  测试用例   
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css';
// Vue.use(Antd)
// Vue.component(message.name, message);

Vue.config.productionTip = false
//执行拦截器

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
axios(app)
