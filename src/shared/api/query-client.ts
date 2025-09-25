import { MutationCache, QueryCache, QueryClient } from '@tanstack/query-core';
import { isAxiosError } from 'axios';
import { ROUTES } from '@/shared/constants/routes';

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
    queryCache: new QueryCache({
        onError: catchUnauthorizedError,
    }),
    mutationCache: new MutationCache({
        onError: catchUnauthorizedError,
    }),
});

function catchUnauthorizedError(error: any) {
    if (isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
            if (
                !window.location.pathname.includes(ROUTES.AUTH.ROOT)
            ) {
                queryClient.clear();
                window.history.pushState(null, '', ROUTES.AUTH.LOGIN);
            }
            return;
        }
    }
    throw error;
}