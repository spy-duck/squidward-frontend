import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { HostRemoveContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useRemoveHost({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (uuid: string) => {
            const response = await apiClient<HostRemoveContract.Response>({
                url: HostRemoveContract.url(uuid),
                method: HostRemoveContract.endpointDetails.REQUEST_METHOD,
            });
            return response.data.response.success;
        },
        onSuccess,
        onError: apiErrorHandler({
            contract: HostRemoveContract,
        }),
    });
    return {
        removeHost: mutate,
        isPending,
    }
}