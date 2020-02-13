import Vue from 'vue';
import Vuex from 'vuex';
import a from './a';
import b from './b'
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    a, b
  }
})
// 然后main.js使用这个index
// 这个index就相当于store
// new Vue({
//   router,//名字必须是router
//   store,
//   render: h => h(App),
// }).$mount('#app')

