import { createApp } from 'vue';
//import App from './App.vue';
import App_test from './App_test.vue';
import router from './components/router/index';
import axios from 'axios';
import mitt from 'mitt'
let emitter = mitt();

//const app = createApp(App);
let app = createApp(App_test);
app.config.globalProperties.emitter = emitter;

app.config.globalProperties.$axios = axios;
app.use(router);
app.mount('#app');
