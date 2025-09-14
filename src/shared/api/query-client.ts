import { QueryClient } from '@tanstack/query-core';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            refetchIntervalInBackground: false,
            retry: false,
            gcTime: 120 * 1_000,
            staleTime: 60 * 1_000,
        },
        mutations: {
            retry: false,
        },
    },
})