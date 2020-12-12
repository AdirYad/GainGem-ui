import { Roles } from "@/_helpers/roles";

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
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/Profile.vue'),
        meta: {
            authorize: [
                Roles.SuperAdmin,
                Roles.Admin,
                Roles.Supplier,
                Roles.User,
            ],
        },
    },
    {
        path: '/rewards',
        name: 'Rewards',
        component: () => import('@/views/Rewards.vue'),
        meta: {
            authorize: [
                Roles.SuperAdmin,
                Roles.Admin,
                Roles.Supplier,
                Roles.User,
            ],
        },
    },
    {
        path: '/invite',
        name: 'Invite',
        component: () => import('@/views/Invite.vue'),
        meta: {
            authorize: [
                Roles.SuperAdmin,
                Roles.Admin,
                Roles.Supplier,
                Roles.User,
            ],
        }
    },
    {
        path: '/giveaways',
        name: 'Giveaways',
        component: () => import('@/views/Giveaway.vue'),
        meta: {
            authorize: [
                Roles.SuperAdmin,
                Roles.Admin,
                Roles.Supplier,
                Roles.User,
            ],
        }
    },
    {
        path: '/tasks',
        name: 'Tasks',
        component: () => import('@/views/Tasks.vue'),
        meta: {
            authorize: [
                Roles.SuperAdmin,
                Roles.Admin,
                Roles.Supplier,
                Roles.User,
            ],
        }
    },
    {
        path: '/offerwall/:provider',
        name: 'Offerwall',
        component: () => import('@/views/Offerwall.vue'),
        meta: {
            authorize: [
                Roles.SuperAdmin,
                Roles.Admin,
                Roles.Supplier,
                Roles.User,
            ],
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/Admin.vue'),
        meta: {
            authorize: [
                Roles.SuperAdmin,
                Roles.Admin,
            ],
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