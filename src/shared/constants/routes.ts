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
            CONFIG: '/squid/config',
        }
    },
} as const;