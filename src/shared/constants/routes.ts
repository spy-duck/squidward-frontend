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
            ROOT: '/dashboard/nodes',
        },
        USERS: {
            ROOT: '/dashboard/users',
        },
        SQUID: {
            ROOT: '/dashboard/squid',
            CONFIGS: '/dashboard/squid/configs',
        },
        API_TOKENS: {
            ROOT: '/dashboard/api-tokens',
        },
        HOSTS: {
            ROOT: '/dashboard/hosts',
        },
    },
} as const;