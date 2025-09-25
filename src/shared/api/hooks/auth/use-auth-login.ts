import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api';
import { AuthLoginContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useAuthLogin() {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: AuthLoginContract.Request) => {
            const response = await apiClient<AuthLoginContract.Response>({
                url: AuthLoginContract.endpointDetails.CONTROLLER_URL,
                method: AuthLoginContract.endpointDetails.REQUEST_METHOD,
                data,
            });
            return AuthLoginContract
                .ResponseSchema
                .parseAsync(response.data);
        },
        onError: apiErrorHandler({
            contract: AuthLoginContract,
        }),
    });
    return {
        authLogin: mutateAsync,
        isLoading: isPending,
    }
}