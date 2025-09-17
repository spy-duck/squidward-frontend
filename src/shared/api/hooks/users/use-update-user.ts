import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { UserUpdateContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useUpdateUser({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: UserUpdateContract.Request) => {
            const response = await apiClient<UserUpdateContract.Response>({
                url: UserUpdateContract.url(data.uuid),
                method: UserUpdateContract.endpointDetails.REQUEST_METHOD,
                data,
            });
            return response.data.response.success;
        },
        onSuccess,
        onError: apiErrorHandler({
            contract: UserUpdateContract,
        }),
    });
    return {
        updateUser: mutate,
        isPending,
    }
}