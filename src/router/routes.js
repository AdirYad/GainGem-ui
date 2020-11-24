export default [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/verify',
        name: 'Verify',
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
        component: () => import('@/components/Temp.vue'),
        children: [
            {
                path: '',
                name: 'Profile',
                component: () => import('@/views/Register.vue'),
            },
            {
                path: 'transactions',
                name: 'Profile.Transactions',
                component: () => import('@/views/Register.vue'),
            },
            {
                path: 'referrals',
                name: 'Profile.Referrals',
                component: () => import('@/views/Register.vue'),
            },
            {
                path: 'offers-history',
                name: 'Profile.OffersHistory',
                component: () => import('@/views/Register.vue'),
            },
        ],
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
        component: () => import('@/views/Register.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/invite',
        name: 'Invite',
        component: () => import('@/views/Register.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/giveaways',
        name: 'Giveaways',
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
];