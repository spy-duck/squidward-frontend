import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { UpdateUserContract } from '@swuidward/contracts/commands';

export function useUpdateUser({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: UpdateUserContract.Request) => {
            const response = await apiClient<UpdateUserContract.Response>({
                url: UpdateUserContract.url(data.uuid),
                method: UpdateUserContract.endpointDetails.REQUEST_METHOD,
                data,
            });
            return response.data.response.success;
        },
        onSuccess,
    });
    return {
        updateUser: mutate,
        isPending,
    }
}