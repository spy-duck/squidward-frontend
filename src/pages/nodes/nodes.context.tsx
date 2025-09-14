import { createContext, type Dispatch, type SetStateAction, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useGetNodes } from '@/shared/api/hooks/use-get-nodes';
import { NodesListContract } from '@swuidward/contracts/commands';
import { queryClient } from '@/common/api';
import { useIsEditNodeStore, useIsRemoveNodeStore } from '@/entities/nodes/nodes-store';
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
    
    useEffect(() => {
        if (isCreateModalOpen || isEditModalOpen) return
            ;
        (async () => {
            await queryClient.refetchQueries({ queryKey: [ QUERY_KEYS.NODES.NODES_LIST ] })
        })()
    }, [ isCreateModalOpen, isEditModalOpen ])
    
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