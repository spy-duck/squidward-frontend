export const QUERY_KEYS = {
    NODES: {
        NODES_LIST: [ 'NODES_LIST' ],
        KEYGEN: [ 'KEYGEN' ],
    },
    USERS: {
        USERS_LIST: [ 'USERS_LIST' ],
    },
    CONFIGS: {
        CONFIGS_LIST: [ 'CONFIGS_LIST' ],
        CONFIG_ITEM: (uuid: string) => [ 'CONFIGS_LIST', uuid ],
    },
} as const;