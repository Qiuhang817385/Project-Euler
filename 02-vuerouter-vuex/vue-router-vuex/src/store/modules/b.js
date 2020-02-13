const state = {
  countb: 1
}
const mutations = {
  add (state) {
    state.countb++
  },
  dec (state) {
    state.countb--
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