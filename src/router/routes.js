export default [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: {
            guestOnly: true,
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
        meta: {
            guestOnly: true,
        },
    },
    {
        path: '/withdraws',
        name: 'Withdraws',
        component: () => import('@/views/Register.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/referrals',
        name: 'Referrals',
        component: () => import('@/views/Register.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/support',
        name: 'Support',
        component: () => import('@/views/Register.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/#',
        name: '#',
        component: () => import('@/views/Home.vue'),
    },
];