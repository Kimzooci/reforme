import { createStore } from 'vuex';
//user_id 접근 추가함 (동윤이 요청)
const store = createStore({
  state: {
    reforme: true,  // 기본값을 설정
    userId: null,
  },
  mutations: {
    setReforme(state, value) {
      state.reforme = value;
    },
    setUserId(state, userId) {
      state.userId = userId;
    }
  },
  actions: {
    updateReforme({ commit }, value) {
      commit('setReforme', value);
    },
    updateUserId({ commit }, userId) {
      commit('setUserId', userId);
    },
  },
  getters: {
    getReforme: (state) => state.reforme,
    getUserId: (state) => state.userId,
  },
});

export default store;
