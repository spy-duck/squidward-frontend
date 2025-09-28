import { createContext, type Dispatch, type SetStateAction, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { queryClient, useGetHosts } from '@/shared/api';
import { HostsListContract } from '@squidward/contracts/commands';
import {
    useIsEditHostStore,
    useIsRemoveHostStore,
    useResetHostStore,
} from '@/entities';
import { QUERY_KEYS } from '@/shared/constants/api';

type THostsPageContext = {
    hosts: HostsListContract.Response['response']['hosts'],
    isLoading: boolean,
    isCreateModalOpen: boolean,
    isEditModalOpen: boolean,
    isRemoveModalOpen: boolean,
    refetchHosts(): void,
    openCreateModalOpen: Dispatch<SetStateAction<boolean>>,
};


export const HostsPageContext = createContext<THostsPageContext>({} as THostsPageContext)

export const useHostsPageContext = () => useContext(HostsPageContext);

type THostsPageContextProps = {
    children?: ReactNode
};
export const HostsPageProvider = ({ children }: THostsPageContextProps) => {
    const [ isCreateModalOpen, openCreateModalOpen ] = useState(false);
    const [ isEditModalOpen ] = useIsEditHostStore();
    const [ isRemoveModalOpen ] = useIsRemoveHostStore();
    const { hosts, isLoading, refetchHosts } = useGetHosts();
    const resetHostStore = useResetHostStore();
    
    useEffect(() => {
        ;(async () => {
            await queryClient.prefetchQuery({
                queryKey: QUERY_KEYS.HOSTS.HOSTS_LIST,
            });
        })();
        return () => {
            resetHostStore();
        }
    }, []);
    
    return (
        <HostsPageContext value={ {
            hosts: hosts || [],
            refetchHosts,
            isLoading,
            isCreateModalOpen,
            isEditModalOpen,
            isRemoveModalOpen,
            openCreateModalOpen,
        } }>
            { children }
        </HostsPageContext>
    );
    
}