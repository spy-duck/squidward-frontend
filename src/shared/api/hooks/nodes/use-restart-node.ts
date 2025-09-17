import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { NodeRestartContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useRestartNode({ onSuccess }: {
    onSuccess?: () => void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: NodeRestartContract.Request) => {
            const response = await apiClient<NodeRestartContract.Response>({
                url: NodeRestartContract.url(data.uuid),
                method: NodeRestartContract.endpointDetails.REQUEST_METHOD,
                data,
            });
            return response.data.response.success;
        },
        onSuccess,
        onError: apiErrorHandler({
            contract: NodeRestartContract,
        }),
    });
    return {
        restartNode: mutate,
        isPending,
    }
}