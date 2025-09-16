import { notifications } from '@mantine/notifications';
import type { IContract } from '@/shared/types/contract';
import { isAxiosError } from 'axios';

export function apiErrorHandler<T>({
    contract,
}: { contract: T }) {
    return (error: any) => {
        console.error(error);
        let message = `Request failed with unknown error.`;
        if (isAxiosError(error) && error.response?.data?.message) {
            message = error.response.data.message;
        } else if (error instanceof Error) {
            message = error.message;
        }
        notifications.show({
            title: (contract as IContract).endpointDetails.METHOD_DESCRIPTION || 'Error',
            message,
            color: 'red'
        });
    }
}