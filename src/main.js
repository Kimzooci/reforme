import { createApp } from 'vue';
//import App from './App.vue'; // App.vue를 사용
import App_test from './App_test.vue';
import router from './components/router/index';
import axios from 'axios';
import store from './store'; // store import
import mitt from 'mitt';

let emitter = mitt();

// App_test를 사용할지 App을 사용할지 선택
const app = createApp(App_test);

// 글로벌 프로퍼티 설정
app.config.globalProperties.emitter = emitter;
app.config.globalProperties.$axios = axios;

// 플러그인 사용
app.use(router);
app.use(store);

// 애플리케이션 마운트
app.mount('#app');
