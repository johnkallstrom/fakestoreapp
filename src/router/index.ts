import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Start from '../views/Start.vue';
import Products from '../views/Products.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'start',
        component: Start
    },
    {
        path: '/products',
        name: 'products',
        component: Products
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;