import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { NodeCreateContract } from '@squidward/contracts/commands';

export function useCreateNode({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: NodeCreateContract.Request) => {
            const response = await apiClient<NodeCreateContract.Response>({
                url: NodeCreateContract.endpointDetails.CONTROLLER_URL,
                method: NodeCreateContract.endpointDetails.REQUEST_METHOD,
                data,
            });
            return response.data.response.success;
        },
        onSuccess,
    });
    return {
        createNode: mutate,
        isPending,
    }
}