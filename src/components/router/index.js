import { createRouter, createWebHistory } from 'vue-router';
import Reforme from '@/components/Reforme.vue';
import Reforyou from '@/components/Reforyou.vue';
import Signup from '@/components/signup.vue';
import Signin from '@/components/signin.vue';
import Chatbot from '@/components/chatbot.vue';
import Board from '@/components/board.vue';
import Home from '@/components/home.vue';
import axios from 'axios';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/reforme',
        name: 'reforme',
        component: Reforme,
    },
    {
        path: '/reforyou',
        name: 'reforyou',
        component: Reforyou,
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup,
    },
    {
        path: '/signin',
        name: 'signin',
        component: Signin,
    },
    {
        path: '/chatbot',
        name: 'chatbot',
        component: Chatbot,
    },
    {
        path: '/reforme/board',
        name: 'board',
        component: Board,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        try {
            const response = await axios.get('/api/check-session', { withCredentials: true });
            if (response.data.statusCode === 200) {
                next(); // 세션이 유효한 경우 이동 허용
            } else {
                next({ name: 'signin' }); // 세션이 유효하지 않은 경우 로그인 페이지로 이동
            }
        } catch (error) {
            next({ name: 'signin' }); // 오류 발생 시 로그인 페이지로 이동
        }
    } else {
        next(); // requiresAuth가 없는 경우 이동 허용
    }
});

export default router;
