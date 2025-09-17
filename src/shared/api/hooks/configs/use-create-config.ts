import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { ConfigCreateContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useCreateConfig({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: ConfigCreateContract.Request) => {
            const response = await apiClient<ConfigCreateContract.Response>({
                url: ConfigCreateContract.endpointDetails.CONTROLLER_URL,
                method: ConfigCreateContract.endpointDetails.REQUEST_METHOD,
                data,
            });
            return response.data.response.success;
        },
        onSuccess,
        onError: apiErrorHandler({
            contract: ConfigCreateContract,
        }),
    });
    return {
        createConfig: mutate,
        isPending,
    }
}