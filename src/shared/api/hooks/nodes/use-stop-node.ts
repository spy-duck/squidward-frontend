import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { NodeStopContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useStopNode({ onSuccess }: {
    onSuccess?: () => void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: NodeStopContract.Request) => {
            const response = await apiClient<NodeStopContract.Response>({
                url: NodeStopContract.url(data.uuid),
                method: NodeStopContract.endpointDetails.REQUEST_METHOD,
                data,
            });
            return response.data.response.success;
        },
        onSuccess,
        onError: apiErrorHandler({
            contract: NodeStopContract,
        }),
    });
    return {
        stopNode: mutate,
        isPending,
    }
}