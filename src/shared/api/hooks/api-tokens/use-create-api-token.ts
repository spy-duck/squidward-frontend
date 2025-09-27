import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { ApiTokenCreateContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useCreateApiToken({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: ApiTokenCreateContract.Request) => {
            const response = await apiClient<ApiTokenCreateContract.Response>({
                url: ApiTokenCreateContract.endpointDetails.CONTROLLER_URL,
                method: ApiTokenCreateContract.endpointDetails.REQUEST_METHOD,
                data,
            });
            return response.data.response.success;
        },
        onSuccess,
        onError: apiErrorHandler({
            contract: ApiTokenCreateContract,
        }),
    });
    return {
        createApiToken: mutate,
        isPending,
    }
}