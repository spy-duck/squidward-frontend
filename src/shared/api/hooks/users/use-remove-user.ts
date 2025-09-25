import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { UserRemoveContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useRemoveUser({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (uuid: string) => {
            const response = await apiClient<UserRemoveContract.Response>({
                url: UserRemoveContract.url(uuid),
                method: UserRemoveContract.endpointDetails.REQUEST_METHOD,
            });
            return response.data.response.success;
        },
        onSuccess,
        onError: apiErrorHandler({
            contract: UserRemoveContract,
        }),
    });
    return {
        removeUser: mutate,
        isPending,
    }
}