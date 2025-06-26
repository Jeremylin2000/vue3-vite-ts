import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('../view/index/index.vue')
    },
    {
        path: '/census',
        name: 'census',
        component: () => import('../view/census/census.vue')
    },
    {
        path: '/manage',
        name: 'manage',
        component: () => import('../view/manage/manage.vue')
    },
    {
        path: '/order',
        name: 'order',
        component: () => import('../view/order/order.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router