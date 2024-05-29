import { createRouter, createWebHistory } from 'vue-router';
import Reforme from '@/components/Reforme.vue';
import Reforyou from '@/components/Reforyou.vue';
import Signup from '@/components/signup.vue';
import Signin from '@/components/signin.vue';
import Chatbot from '@/components/chatbot.vue';
import Board from '@/components/board.vue';
import Home from '@/components/home.vue';
import { checkSession } from '@/utils/sessionCheck'; // 유틸리티 파일 임포트

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/reforme', name: 'reforme', component: Reforme, meta: { requiresAuth: true } },
    { path: '/reforyou', name: 'reforyou', component: Reforyou, meta: { requiresAuth: true } },
    { path: '/signup', name: 'signup', component: Signup },
    { path: '/signin', name: 'signin', component: Signin },
    { path: '/chatbot', name: 'chatbot', component: Chatbot, meta: { requiresAuth: true } },
    { path: '/reforme/board', name: 'board', component: Board, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const isAuthenticated = await checkSession();
        if (isAuthenticated) {
            next();
        } else {
            next({ name: 'signin' });
        }
    } else {
        next();
    }
});

export default router;
