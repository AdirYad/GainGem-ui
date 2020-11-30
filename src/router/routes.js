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
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/Register.vue'),
        meta: {
            authOnly: true
        },
    },
    {
        path: '/rewards',
        name: 'Rewards',
        component: () => import('@/views/Rewards.vue'),
        meta: {
            authOnly: true
        },
    },
    {
        path: '/invite',
        name: 'Invite',
        component: () => import('@/views/Invite.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/giveaways',
        name: 'Giveaways',
        component: () => import('@/views/Giveaway.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/support',
        name: 'Support',
        component: () => import('@/views/Support.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/offerwall/:provider',
        name: 'Offerwall',
        component: () => import('@/views/Offerwall.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/#',
        name: '#',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/:catchAll(.*)*',
        name: 'NotFound',
        component: () => import('@/views/Home.vue'),
    },
];