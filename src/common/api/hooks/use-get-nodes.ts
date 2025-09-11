import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/common/api/axios';
import { NodesListContract } from 'contracts/commands';

export function useGetNodes() {
    const { data, isLoading } = useQuery({
        queryKey: ['nodes'],
        queryFn: async () => {
            const response = await apiClient({
                url: NodesListContract.endpointDetails.CONTROLLER_URL,
                method: NodesListContract.endpointDetails.REQUEST_METHOD,
            });
            return NodesListContract.ResponseSchema.parse(response.data);
        }
    });
    return {
        nodes: data,
        isLoading
    }
}