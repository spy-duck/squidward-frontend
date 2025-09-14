import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { RemoveUserContract } from '@swuidward/contracts/commands';

export function useRemoveUser({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (uuid: string) => {
            const response = await apiClient<RemoveUserContract.Response>({
                url: RemoveUserContract.url(uuid),
                method: RemoveUserContract.endpointDetails.REQUEST_METHOD,
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