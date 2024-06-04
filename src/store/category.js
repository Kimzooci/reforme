import { createStore } from 'vuex';

export default createStore({
  state: {
    reforme: true // 기본값을 true로 설정
  },
  mutations: {
    setReforme(state, value) {
      state.reforme = value;
    }
  }
});
