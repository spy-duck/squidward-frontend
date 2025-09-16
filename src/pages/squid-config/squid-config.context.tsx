import { createContext, type Dispatch, type SetStateAction, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ConfigsListContract } from '@squidward/contracts/commands';
import { useIsEditConfigStore, useIsRemoveConfigStore, useResetActionConfigStore } from '@/entities';
import { queryClient } from '@/shared/api';
import { QUERY_KEYS } from '@/shared/constants/api';
import { useGetConfigs } from '@/shared/api/hooks/configs';

type TSquidConfigPageContext = {
    configs: ConfigsListContract.Response['response']['configs'],
    isLoading: boolean,
    isCreateModalOpen: boolean,
    isEditModalOpen: boolean,
    isRemoveModalOpen: boolean,
    refetchConfigs(): void,
    openCreateModalOpen: Dispatch<SetStateAction<boolean>>,
};


export const SquidConfigPageContext = createContext<TSquidConfigPageContext>({} as TSquidConfigPageContext)

export const useSquidConfigPageContext = () => useContext(SquidConfigPageContext);

type TSquidConfigPageContextProps = {
    children?: ReactNode
};
export const SquidConfigPageProvider = ({ children }: TSquidConfigPageContextProps) => {
    const [ isCreateModalOpen, openCreateModalOpen ] = useState(false);
    const [ isEditModalOpen ] = useIsEditConfigStore();
    const [ isRemoveModalOpen ] = useIsRemoveConfigStore();
    const { configs, isLoading, refetchConfigs } = useGetConfigs();
    const resetAction = useResetActionConfigStore();
    
    useEffect(() => {
        ;(async () => {
            await queryClient.prefetchQuery({
                queryKey: QUERY_KEYS.CONFIGS.CONFIGS_LIST,
            });
        })();
        return () => {
            resetAction();
        }
    }, []);
    
    return (
        <SquidConfigPageContext value={ {
            configs: configs || [],
            refetchConfigs,
            isLoading,
            isCreateModalOpen,
            isEditModalOpen,
            isRemoveModalOpen,
            openCreateModalOpen,
        } }>
            { children }
        </SquidConfigPageContext>
    );
    
}