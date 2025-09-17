import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { NodeCreateContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useCreateNode({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: NodeCreateContract.Request) => {
            const response = await apiClient<NodeCreateContract.Response>({
                url: NodeCreateContract.endpointDetails.CONTROLLER_URL,
                method: NodeCreateContract.endpointDetails.REQUEST_METHOD,
                data,
            });
            return response.data.response.success;
        },
        onSuccess,
        onError: apiErrorHandler({
            contract: NodeCreateContract,
        }),
    });
    return {
        createNode: mutate,
        isPending,
    }
}