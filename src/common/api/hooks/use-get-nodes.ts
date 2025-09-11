import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/common/api/axios';
import { NodesListContract } from '@swuidward/contracts/commands';
import { QUERY_KEYS } from '@/common/constants/api';

export function useGetNodes() {
    const { data, isLoading, refetch } = useQuery({
        queryKey: [ QUERY_KEYS.NODES.NODES_LIST],
        queryFn: async () => {
            const response = await apiClient<NodesListContract.Response>({
                url: NodesListContract.endpointDetails.CONTROLLER_URL,
                method: NodesListContract.endpointDetails.REQUEST_METHOD,
            });
            return NodesListContract.ResponseSchema.parse(response.data);
        },
        select(data: NodesListContract.Response) {
            return data.response.nodes;
        }
    });
    return {
        nodes: data,
        refetchNodes: refetch,
        isLoading
    }
}