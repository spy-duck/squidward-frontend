import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { HostsListContract } from '@squidward/contracts/commands';
import { QUERY_KEYS } from '@/shared/constants/api';

export function useGetHosts() {
    const { data, isLoading, refetch } = useQuery({
        queryKey: QUERY_KEYS.HOSTS.HOSTS_LIST,
        queryFn: async () => {
            const response = await apiClient<HostsListContract.Response>({
                url: HostsListContract.endpointDetails.CONTROLLER_URL,
                method: HostsListContract.endpointDetails.REQUEST_METHOD,
            });
            return response.data ? HostsListContract
                .ResponseSchema
                .parseAsync(response.data) : undefined;
        },
        select(
            data: HostsListContract.Response | undefined,
        ): HostsListContract.Response['response']['hosts'] | null {
            return data?.response?.hosts || null;
        },
        throwOnError: true,
        staleTime: 5000,
        refetchInterval: Infinity,
        refetchOnMount: 'always',
    });
    return {
        hosts: data,
        refetchHosts: refetch,
        isLoading,
    }
}