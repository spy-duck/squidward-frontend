import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { ApiTokensListContract } from '@squidward/contracts/commands';
import { QUERY_KEYS } from '@/shared/constants/api';

export function useGetApiTokens() {
    const { data, isLoading, refetch } = useQuery({
        queryKey: QUERY_KEYS.API_TOKENS.API_TOKENS_LIST,
        queryFn: async () => {
            const response = await apiClient<ApiTokensListContract.Response>({
                url: ApiTokensListContract.endpointDetails.CONTROLLER_URL,
                method: ApiTokensListContract.endpointDetails.REQUEST_METHOD,
            });
            return response.data ? ApiTokensListContract
                .ResponseSchema
                .parseAsync(response.data) : undefined;
        },
        select(
            data: ApiTokensListContract.Response | undefined,
        ): ApiTokensListContract.Response['response']['apiTokens'] | null {
            return data?.response?.apiTokens || null;
        },
        throwOnError: true,
        staleTime: 5000,
        refetchInterval: Infinity,
        refetchOnMount: 'always',
    });
    return {
        apiTokens: data,
        refetchApiTokens: refetch,
        isLoading,
    }
}