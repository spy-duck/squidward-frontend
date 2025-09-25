import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/constants/api';
import { apiClient } from '@/shared/api';
import { AuthCheckContract } from '@squidward/contracts/commands';

export function useAuthCheck() {
    const { data, isLoading, isFetched, isError, refetch } = useQuery({
        queryKey: QUERY_KEYS.AUTH.CHECK,
        queryFn: async () => {
            const response = await apiClient<AuthCheckContract.Response>({
                url: AuthCheckContract.endpointDetails.CONTROLLER_URL,
                method: AuthCheckContract.endpointDetails.REQUEST_METHOD,
            });
            return AuthCheckContract
                .ResponseSchema
                .parseAsync(response.data);
        },
        throwOnError: false,
        staleTime: 5000,
        refetchOnMount: 'always',
    });
    
    return {
        authCheck: data,
        isAuthFetched: isFetched || isError,
        refetchCheckAuth: refetch,
        isLoading,
    }
}