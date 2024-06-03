import { createStore } from 'vuex';

const store = createStore({
  state: {
    reforme: false,  // 기본값을 설정
  },
  mutations: {
    setReforme(state, value) {
      state.reforme = value;
    },
  },
  actions: {
    updateReforme({ commit }, value) {
      commit('setReforme', value);
    },
  },
  getters: {
    getReforme: (state) => state.reforme,
  },
});

export default store;
