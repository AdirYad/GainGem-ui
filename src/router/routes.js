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
            authorize: [],
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
        meta: {
            authorize: [],
        },
    },
    {
        path: '/#',
        name: '#',
        component: () => import('@/views/Home.vue'),
    },
];