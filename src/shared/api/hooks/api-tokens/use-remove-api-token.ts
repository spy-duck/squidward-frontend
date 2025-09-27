import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { ApiTokenRemoveContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useRemoveApiToken({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (uuid: string) => {
            const response = await apiClient<ApiTokenRemoveContract.Response>({
                url: ApiTokenRemoveContract.url(uuid),
                method: ApiTokenRemoveContract.endpointDetails.REQUEST_METHOD,
            });
            return response.data.response.success;
        },
        onSuccess,
        onError: apiErrorHandler({
            contract: ApiTokenRemoveContract,
        }),
    });
    return {
        removeApiToken: mutate,
        isPending,
    }
}