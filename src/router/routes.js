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
        name: 'Profile',
        component: () => import('@/views/Register.vue'),
        children: [
            {
                path: '',
                name: 'Profile/Details',
                component: () => import('@/views/Register.vue'),
            },
            {
                path: '/transactions',
                name: 'Profile/Transactions',
                component: () => import('@/views/Register.vue'),
            },
            {
                path: '/referrals',
                name: 'Profile/Referrals',
                component: () => import('@/views/Register.vue'),
            },
            {
                path: '/offers-history',
                name: 'Profile/OffersHistory',
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
        }
    },
    {
        path: '/rewards/:provider',
        name: 'Rewards',
        component: () => import('@/views/Rewards.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/robux',
        name: 'Robux',
        component: () => import('@/views/Robux.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/bitcoin',
        name: 'Bitcoin',
        component: () => import('@/views/Bitcoin.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/apple',
        name: 'Apple',
        component: () => import('@/views/Apple.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/xbox',
        name: 'Xbox',
        component: () => import('@/views/Xbox.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/roblox',
        name: 'Roblox',
        component: () => import('@/views/Roblox.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/psn',
        name: 'Psn',
        component: () => import('@/views/Psn.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/googleplay',
        name: 'Googleplay',
        component: () => import('@/views/Googleplay.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/netflix',
        name: 'Netflix',
        component: () => import('@/views/Netflix.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/spotify',
        name: 'Spotify',
        component: () => import('@/views/Spotify.vue'),
        meta: {
            authOnly: true
        }
    },
    {
        path: '/discord',
        name: 'Discord',
        component: () => import('@/views/Discord.vue'),
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