import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { UserCreateContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useCreateUser({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: UserCreateContract.Request) => {
            const response = await apiClient<UserCreateContract.Response>({
                url: UserCreateContract.endpointDetails.CONTROLLER_URL,
                method: UserCreateContract.endpointDetails.REQUEST_METHOD,
                data,
            });
            return response.data.response.success;
        },
        onSuccess,
        onError: apiErrorHandler({
            contract: UserCreateContract,
        }),
    });
    return {
        createUser: mutate,
        isPending,
    }
}