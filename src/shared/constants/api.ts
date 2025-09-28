export const QUERY_KEYS = {
    AUTH: {
        CHECK: [ 'AUTH_CHECK' ],
    },
    NODES: {
        NODES_LIST: [ 'NODES_LIST' ],
        KEYGEN: [ 'NODES_KEYGEN' ],
    },
    USERS: {
        USERS_LIST: [ 'USERS_LIST' ],
    },
    API_TOKENS: {
        API_TOKENS_LIST: [ 'API_TOKENS_LIST' ],
    },
    HOSTS: {
        HOSTS_LIST: [ 'HOSTS_LIST' ],
    },
    CONFIGS: {
        CONFIGS_LIST: [ 'CONFIGS_LIST' ],
        CONFIG_ITEM: (uuid: string) => [ 'CONFIGS_LIST', uuid ],
    },
} as const;