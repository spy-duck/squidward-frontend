import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { UserRemoveContract } from '@squidward/contracts/commands';

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
    });
    return {
        removeNode: mutate,
        isPending,
    }
}