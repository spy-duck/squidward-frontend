import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { UserCreateContract } from '@squidward/contracts/commands';

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
    });
    return {
        createUser: mutate,
        isPending,
    }
}