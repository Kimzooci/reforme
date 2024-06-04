import { createApp } from 'vue';
import App_test from './App_test.vue';
import router from './components/router/index';
import axios from 'axios';
import store from './store/category'; // category.js 파일 import
import mitt from 'mitt';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'; // bootstrap CSS import
import 'bootstrap/dist/js/bootstrap.js'; // bootstrap JS import

let emitter = mitt();

const app = createApp(App_test);

app.config.globalProperties.emitter = emitter;
app.config.globalProperties.$axios = axios;

app.use(router);
app.use(store);

app.mount('#app');
