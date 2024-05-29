import { createWebHistory, createRouter } from 'vue-router';
import Reforme from '@/components/Reforme.vue';
import Reforyou from '@/components/Reforyou.vue';
import Signup from '@/components/signup.vue';
import Signin from '@/components/signin.vue';
import Chatbot from '@/components/chatbot.vue';
import Board from '@/components/board.vue';
import Home from '@/components/home.vue';

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

export default router;
