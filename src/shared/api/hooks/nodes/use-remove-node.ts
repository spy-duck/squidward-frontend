import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { NodeRemoveContract } from '@squidward/contracts/commands';

export function useRemoveNode({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (uuid: string) => {
            const response = await apiClient<NodeRemoveContract.Response>({
                url: NodeRemoveContract.url(uuid),
                method: NodeRemoveContract.endpointDetails.REQUEST_METHOD,
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