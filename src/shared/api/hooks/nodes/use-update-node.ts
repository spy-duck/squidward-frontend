import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { NodeUpdateContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useUpdateNode({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: NodeUpdateContract.Request) => {
            const response = await apiClient<NodeUpdateContract.Response>({
                url: NodeUpdateContract.url(data.uuid),
                method: NodeUpdateContract.endpointDetails.REQUEST_METHOD,
                data,
            });
            return response.data.response.success;
        },
        onSuccess,
        onError: apiErrorHandler({
            contract: NodeUpdateContract,
        }),
    });
    return {
        updateNode: mutate,
        isPending,
    }
}