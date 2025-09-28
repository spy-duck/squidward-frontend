import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { HostUpdateContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useUpdateHost({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: HostUpdateContract.Request) => {
            const response = await apiClient<HostUpdateContract.Response>({
                url: HostUpdateContract.url(data.uuid),
                method: HostUpdateContract.endpointDetails.REQUEST_METHOD,
                data,
            });
            return response.data.response.success;
        },
        onSuccess,
        onError: apiErrorHandler({
            contract: HostUpdateContract,
        }),
    });
    return {
        updateHost: mutate,
        isPending,
    }
}