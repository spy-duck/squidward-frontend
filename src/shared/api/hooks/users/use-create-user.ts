import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { CreateUserContract } from '@swuidward/contracts/commands';

export function useCreateUser({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: CreateUserContract.Request) => {
            const response = await apiClient<CreateUserContract.Response>({
                url: CreateUserContract.endpointDetails.CONTROLLER_URL,
                method: CreateUserContract.endpointDetails.REQUEST_METHOD,
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