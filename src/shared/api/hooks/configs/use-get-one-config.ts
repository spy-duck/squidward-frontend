import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { ConfigGetOneContract } from '@squidward/contracts/commands';
import { QUERY_KEYS } from '@/shared/constants/api';

export function useGetOneConfig({ uuid }: {
    uuid: string;
}) {

    const { data, isLoading, refetch } = useQuery({
        queryKey: QUERY_KEYS.CONFIGS.CONFIG_ITEM(uuid),
        queryFn: async () => {
            const response = await apiClient<ConfigGetOneContract.Response>({
                url: ConfigGetOneContract.url(uuid),
                method: ConfigGetOneContract.endpointDetails.REQUEST_METHOD,
            });
            return ConfigGetOneContract
                .ResponseSchema
                .parseAsync(response.data);
        },
        select(data: ConfigGetOneContract.Response | undefined): ConfigGetOneContract.Response['response']['config'] | null {
            return data?.response?.config || null;
        },
        throwOnError: true,
        staleTime: 5000,
        refetchOnMount: 'always',
        enabled: false,
    });
    return {
        config: data,
        refetchConfig: refetch,
        isLoading,
    }
}