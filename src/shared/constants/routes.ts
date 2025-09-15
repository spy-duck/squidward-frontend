export const ROUTES = {
    LOGIN: '/login',
    DASHBOARD: {
        NODES: {
            BASE: '/nodes',
        },
        USERS: {
            BASE: '/users',
        },
        SQUID: {
            BASE: '/squid',
            CONFIGS: '/squid/configs',
        }
    },
} as const;