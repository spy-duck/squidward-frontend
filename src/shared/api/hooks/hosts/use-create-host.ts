import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { HostCreateContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useCreateHost({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: HostCreateContract.Request) => {
            const response = await apiClient<HostCreateContract.Response>({
                url: HostCreateContract.endpointDetails.CONTROLLER_URL,
                method: HostCreateContract.endpointDetails.REQUEST_METHOD,
                data,
            });
            return response.data.response.success;
        },
        onSuccess,
        onError: apiErrorHandler({
            contract: HostCreateContract,
        }),
    });
    return {
        createHost: mutate,
        isPending,
    }
}