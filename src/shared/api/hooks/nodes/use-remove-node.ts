import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { RemoveNodeContract } from '@swuidward/contracts/commands/nodes/remove-node.contract';

export function useRemoveNode({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (uuid: string) => {
            const response = await apiClient<RemoveNodeContract.Response>({
                url: RemoveNodeContract.url(uuid),
                method: RemoveNodeContract.endpointDetails.REQUEST_METHOD,
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