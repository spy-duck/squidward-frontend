import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { CreateNodeContract } from '@swuidward/contracts/commands';

export function useCreateNode({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: CreateNodeContract.Request) => {
            const response = await apiClient<CreateNodeContract.Response>({
                url: CreateNodeContract.endpointDetails.CONTROLLER_URL,
                method: CreateNodeContract.endpointDetails.REQUEST_METHOD,
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