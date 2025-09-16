import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { ConfigRemoveContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useRemoveConfig({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (uuid: string) => {
            const response = await apiClient<ConfigRemoveContract.Response>({
                url: ConfigRemoveContract.url(uuid),
                method: ConfigRemoveContract.endpointDetails.REQUEST_METHOD,
            });
            return response.data.response.success;
        },
        onSuccess,
        onError: apiErrorHandler({
            contract: ConfigRemoveContract,
        }),
    });
    return {
        removeConfig: mutate,
        isPending,
    }
}