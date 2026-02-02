import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                component: () => import('@/views/Home/index.vue'),
                meta: { showTab: true, keepAlive: true },
            },
            {
                path: 'discover',
                component: () => import('@/views/Discover/index.vue'),
                meta: { showTab: true, keepAlive: true },
            },
            {
                path: 'mine',
                component: () => import('@/views/Mine/index.vue'),
                meta: { showTab: true, keepAlive: true },
            },
            {
                path: 'points',
                component: () => import('@/views/Points/index.vue'),
                meta: { showTab: true, keepAlive: false },
            },
        ],
    },

    // ❌ 不显示 TabBar
    {
        path: '/detail/:id',
        component: () => import('@/views/Detail/index.vue'),
        meta: { showTab: false },
    },
    {
        path: '/share',
        component: () => import('@/views/ShareCard/index.vue'),
        meta: { showTab: false },
    },
    {
        path: '/public-home',
        component: () => import('@/views/PublicCharityHome/index.vue'),
        meta: { showTab: false },
    },
    {
        path: '/project',
        component: () => import('@/views/DonateSuccess/index.vue'),
        meta: { showTab: false },
    }
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
