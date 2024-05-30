import { createRouter, createWebHistory } from 'vue-router';
import Reforme from '@/components/Reforme.vue';
import Reforyou from '@/components/Reforyou.vue';
import Signup from '@/components/signup.vue';
import Signin from '@/components/signin.vue';
import Chatbot from '@/components/chatbot.vue';
import Board from '@/components/board.vue';
import Home from '@/components/home.vue';
import axios from 'axios';

axios.defaults.withCredentials = true;

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/reforme_page', name: 'reforme_page', component: Reforme, meta: { requiresAuth: true } },
    { path: '/reforyou_page', name: 'reforyou_page', component: Reforyou, meta: { requiresAuth: true } },
    { path: '/signup_page', name: 'signup_page', component: Signup },
    { path: '/signin_page', name: 'signin_page', component: Signin },
    { path: '/chatbot_page', name: 'chatbot_page', component: Chatbot, meta: { requiresAuth: true } },
    { path: '/reforme/board', name: 'board', component: Board, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        try {
            const response = await axios.get('/api/check-session');
            if (response.data.statusCode === 200) {
                next(); // 세션이 유효한 경우 이동 허용
            } else {
                next({ name: 'signin_page' }); // 세션이 유효하지 않은 경우 로그인 페이지로 이동
            }
        } catch (error) {
            next({ name: 'signin_page' }); // 오류 발생 시 로그인 페이지로 이동
        }
    } else {
        next(); // requiresAuth가 없는 경우 이동 허용
    }
});

export default router;
