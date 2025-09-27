import { createContext, type Dispatch, type SetStateAction, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { queryClient, useGetApiTokens } from '@/shared/api';
import { ApiTokensListContract } from '@squidward/contracts/commands';
import {
    useIsRemoveApiTokenStore,
    useResetApiTokenStore,
} from '@/entities';
import { QUERY_KEYS } from '@/shared/constants/api';

type TApiTokensPageContext = {
    apiTokens: ApiTokensListContract.Response['response']['apiTokens'],
    isLoading: boolean,
    isCreateModalOpen: boolean,
    isRemoveModalOpen: boolean,
    refetchApiTokens(): void,
    openCreateModalOpen: Dispatch<SetStateAction<boolean>>,
};


export const ApiTokensPageContext = createContext<TApiTokensPageContext>({} as TApiTokensPageContext)

export const useApiTokensPageContext = () => useContext(ApiTokensPageContext);

type TApiTokensPageContextProps = {
    children?: ReactNode
};
export const ApiTokensPageProvider = ({ children }: TApiTokensPageContextProps) => {
    const [ isCreateModalOpen, openCreateModalOpen ] = useState(false);
    const [ isRemoveModalOpen ] = useIsRemoveApiTokenStore();
    const { apiTokens, isLoading, refetchApiTokens } = useGetApiTokens();
    const resetUserStore = useResetApiTokenStore();
    
    useEffect(() => {
        ;(async () => {
            await queryClient.prefetchQuery({
                queryKey: QUERY_KEYS.API_TOKENS.API_TOKENS_LIST,
            });
        })();
        return () => {
            resetUserStore();
        }
    }, []);
    
    return (
        <ApiTokensPageContext value={ {
            apiTokens: apiTokens || [],
            refetchApiTokens,
            isLoading,
            isCreateModalOpen,
            isRemoveModalOpen,
            openCreateModalOpen,
        } }>
            { children }
        </ApiTokensPageContext>
    );
    
}