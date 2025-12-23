import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { NodeResetTrafficContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useResetNodeTraffic({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (uuid: string) => {
            const response = await apiClient<NodeResetTrafficContract.Response>({
                url: NodeResetTrafficContract.url(uuid),
                method: NodeResetTrafficContract.endpointDetails.REQUEST_METHOD,
            });
            return response.data.response.success;
        },
        onSuccess,
        onError: apiErrorHandler({
            contract: NodeResetTrafficContract,
        }),
    });
    return {
        resetNodeTraffic: mutate,
        isPending,
    }
}