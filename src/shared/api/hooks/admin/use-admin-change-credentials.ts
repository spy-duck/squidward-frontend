import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api';
import { AdminChangeCredentialsContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useAdminChangeCredentials() {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: AdminChangeCredentialsContract.Request) => {
            const response = await apiClient<AdminChangeCredentialsContract.Response>({
                url: AdminChangeCredentialsContract.endpointDetails.CONTROLLER_URL,
                method: AdminChangeCredentialsContract.endpointDetails.REQUEST_METHOD,
                data,
            });
            return AdminChangeCredentialsContract
                .ResponseSchema
                .parseAsync(response.data);
        },
        onError: apiErrorHandler({
            contract: AdminChangeCredentialsContract,
        }),
    });
    return {
        adminChangeCredentials: mutateAsync,
        isLoading: isPending,
    }
}