import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { ConfigUpdateContract } from '@squidward/contracts/commands';

export function useUpdateConfig({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: ConfigUpdateContract.Request) => {
            const response = await apiClient<ConfigUpdateContract.Response>({
                url: ConfigUpdateContract.url(data.uuid),
                method: ConfigUpdateContract.endpointDetails.REQUEST_METHOD,
                data,
            });
            return response.data.response.success;
        },
        onSuccess,
    });
    return {
        updateConfig: mutate,
        isPending,
    }
}