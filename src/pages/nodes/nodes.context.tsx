import { createContext, type Dispatch, type SetStateAction, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { queryClient, useGetNodes } from '@/shared/api';
import { NodesListContract } from '@squidward/contracts/commands';
import { useIsEditNodeStore, useIsRemoveNodeStore, useResetActionNodeStore } from '@/entities';
import { QUERY_KEYS } from '@/shared/constants/api';

type TNodesPageContext = {
    nodes: NodesListContract.Response['response']['nodes'],
    isLoading: boolean,
    isCreateModalOpen: boolean,
    isEditModalOpen: boolean,
    isRemoveModalOpen: boolean,
    refetchNodes(): void,
    openCreateModalOpen: Dispatch<SetStateAction<boolean>>,
};


export const NodesPageContext = createContext<TNodesPageContext>({} as TNodesPageContext)

export const useNodesPageContext = () => useContext(NodesPageContext);

type TNodesPageContextProps = {
    children?: ReactNode
};
export const NodesPageProvider = ({ children }: TNodesPageContextProps) => {
    const [ isCreateModalOpen, openCreateModalOpen ] = useState(false);
    const [ isEditModalOpen ] = useIsEditNodeStore();
    const [ isRemoveModalOpen ] = useIsRemoveNodeStore();
    const { nodes, isLoading, refetchNodes } = useGetNodes();
    const resetAction = useResetActionNodeStore();
    
    useEffect(() => {
        (async () => {
            await queryClient.prefetchQuery({
                queryKey: QUERY_KEYS.NODES.NODES_LIST,
            });
        })();
        
        return () => {
            resetAction()
        }
    }, []);
    
    return (
        <NodesPageContext value={ {
            nodes,
            refetchNodes,
            isLoading,
            isCreateModalOpen,
            isEditModalOpen,
            isRemoveModalOpen,
            openCreateModalOpen,
        } }>
            { children }
        </NodesPageContext>
    );
    
}