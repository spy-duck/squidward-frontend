import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { ConfigsListContract } from '@squidward/contracts/commands';
import { QUERY_KEYS } from '@/shared/constants/api';

export function useGetConfigs() {
    const { data, isLoading, refetch } = useQuery({
        queryKey: QUERY_KEYS.CONFIGS.CONFIGS_LIST,
        queryFn: async () => {
            const response = await apiClient<ConfigsListContract.Response>({
                url: ConfigsListContract.endpointDetails.CONTROLLER_URL,
                method: ConfigsListContract.endpointDetails.REQUEST_METHOD,
            });
            return ConfigsListContract
                .ResponseSchema
                .parseAsync(response.data);
        },
        select(data: ConfigsListContract.Response | undefined): ConfigsListContract.Response['response']['configs'] | null {
            return data?.response?.configs || null;
        },
        throwOnError: true,
        staleTime: 5000,
        refetchOnMount: 'always',
    });
    return {
        configs: data,
        refetchConfigs: refetch,
        isLoading,
    }
}