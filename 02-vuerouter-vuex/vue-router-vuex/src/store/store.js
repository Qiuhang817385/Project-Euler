import Vue from 'vue';
import vuex, { mapState } from 'vuex';


Vue.use(vuex);
export default new vuex.Store({
  state: {
    count: 0
  },
  // Mutation必须是同步的，Action是异步的Mutation
  // 同步
  mutations: {
    add (state) {
      state.count++;
    }
  },
  strict: true,
  getters: {
    age: state => `ლ(′◉❥◉｀ლ)${state.count * 12}`
  },
  // ...mapState({
  //   count2: state => state.count
  // }),
  // 异步
  actions: {
    addSync ({ commit }) {
      setTimeout(() => {
        commit('add')
        console.log('123');
      }, 3000)
    }
  }

})