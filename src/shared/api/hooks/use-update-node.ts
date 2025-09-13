import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { UpdateNodeContract } from '@swuidward/contracts/commands';

export function useUpdateNode({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: UpdateNodeContract.Request) => {
            const response = await apiClient<UpdateNodeContract.Response>({
                url: UpdateNodeContract.url(data.uuid),
                method: UpdateNodeContract.endpointDetails.REQUEST_METHOD,
                data,
            });
            return response.data.response.success;
        },
        onSuccess,
    });
    return {
        updateNode: mutate,
        isPending,
    }
}