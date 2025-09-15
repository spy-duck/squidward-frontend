import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { NodesListContract } from '@squidward/contracts/commands';
import { QUERY_KEYS } from '@/shared/constants/api';

export function useGetNodes() {
    const { data, isLoading, refetch } = useQuery({
        queryKey: [ QUERY_KEYS.NODES.NODES_LIST ],
        queryFn: async () => {
            const response = await apiClient<NodesListContract.Response>({
                url: NodesListContract.endpointDetails.CONTROLLER_URL,
                method: NodesListContract.endpointDetails.REQUEST_METHOD,
            });
            return NodesListContract.ResponseSchema.parseAsync(response.data);
        },
        select(data: NodesListContract.Response) {
            return data.response.nodes;
        },
        staleTime: 5000,
        refetchInterval: 5000,
        throwOnError: true,
    });
    return {
        nodes: data,
        refetchNodes: refetch,
        isLoading,
    }
}