export const ROUTES = {
    ROOT: '/',
    AUTH: {
        ROOT: '/auth',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
    },
    DASHBOARD: {
        ROOT: '/dashboard',
        NODES: {
            BASE: '/dashboard/nodes',
        },
        USERS: {
            BASE: '/dashboard/users',
        },
        SQUID: {
            BASE: '/dashboard/squid',
            CONFIGS: '/dashboard/squid/configs',
        }
    },
} as const;