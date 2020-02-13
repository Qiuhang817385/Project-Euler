const state = {
  counta: 1
}
const mutations = {
  add (state) {
    state.counta++
  },
  dec (state) {
    state.counta--
  }
}
const actions = {
  addS: ({ commit }) => {
    commit('add')
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations,
}

// 取数据的时候$store.state.a.count
// 这个a就是index里面module里面的a