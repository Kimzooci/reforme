import { createApp } from 'vue';
//import App from './App.vue';
import App_test from './App_test.vue';
import router from './components/router/index';
import axios from 'axios';

//const app = createApp(App);
const app = createApp(App_test);

app.config.globalProperties.$axios = axios;
app.use(router);
app.mount('#app');
