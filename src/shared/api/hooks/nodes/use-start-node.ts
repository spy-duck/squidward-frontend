import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { NodeStartContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useStartNode({ onSuccess }: {
    onSuccess?: () => void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: NodeStartContract.Request) => {
            const response = await apiClient<NodeStartContract.Response>({
                url: NodeStartContract.url(data.uuid),
                method: NodeStartContract.endpointDetails.REQUEST_METHOD,
                data,
            });
            return response.data.response.success;
        },
        onSuccess,
        onError: apiErrorHandler({
            contract: NodeStartContract,
        }),
    });
    return {
        startNode: mutate,
        isPending,
    }
}