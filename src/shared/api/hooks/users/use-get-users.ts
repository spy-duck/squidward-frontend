import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/axios';
import { UsersListContract } from '@squidward/contracts/commands';
import { QUERY_KEYS } from '@/shared/constants/api';

export function useGetUsers() {
    const { data, isLoading, refetch } = useQuery({
        queryKey: QUERY_KEYS.USERS.USERS_LIST,
        queryFn: async () => {
            const response = await apiClient<UsersListContract.Response>({
                url: UsersListContract.endpointDetails.CONTROLLER_URL,
                method: UsersListContract.endpointDetails.REQUEST_METHOD,
            });
            return UsersListContract
                .ResponseSchema
                .parseAsync(response.data);
        },
        select(data: UsersListContract.Response | undefined): UsersListContract.Response['response']['users'] | null {
            return data?.response?.users || null;
        },
        throwOnError: true,
        staleTime: 5000,
        refetchInterval: 5000,
        refetchOnMount: 'always',
    });
    return {
        users: data,
        refetchUsers: refetch,
        isLoading,
    }
}