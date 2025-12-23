import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { UserResetTrafficContract } from '@squidward/contracts/commands';
import { apiErrorHandler } from '@/shared/api/helpers/api-error-handler';

export function useResetUserTraffic({ onSuccess }: {
    onSuccess(): void;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (uuid: string) => {
            const response = await apiClient<UserResetTrafficContract.Response>({
                url: UserResetTrafficContract.url(uuid),
                method: UserResetTrafficContract.endpointDetails.REQUEST_METHOD,
            });
            return response.data.response.success;
        },
        onSuccess,
        onError: apiErrorHandler({
            contract: UserResetTrafficContract,
        }),
    });
    return {
        resetUserTraffic: mutate,
        isPending,
    }
}