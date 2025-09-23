import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { NodeKeygenContract } from '@squidward/contracts/commands';
import { QUERY_KEYS } from '@/shared/constants/api';

type UseKeygenNodesProps = {
    enabled: boolean;
}

export function useKeygenNodes({ enabled }: UseKeygenNodesProps) {
    const { data, isLoading, refetch } = useQuery({
        queryKey: QUERY_KEYS.NODES.KEYGEN,
        queryFn: async () => {
            const response = await apiClient<NodeKeygenContract.Response>({
                url: NodeKeygenContract.endpointDetails.CONTROLLER_URL,
                method: NodeKeygenContract.endpointDetails.REQUEST_METHOD,
            });
            return NodeKeygenContract.ResponseSchema.parseAsync(response.data);
        },
        select(data: NodeKeygenContract.Response) {
            return data.response.credentials;
        },
        staleTime: 1000,
        refetchInterval: 5000,
        throwOnError: true,
        enabled,
    });
    return {
        publicKey: data,
        refetchPublicKey: refetch,
        isLoading,
    }
}