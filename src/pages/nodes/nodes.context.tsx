import { createContext, type Dispatch, type SetStateAction, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useGetNodes } from '@/shared/api/hooks/use-get-nodes';
import { NodesListContract } from '@swuidward/contracts/commands';

type TNodesPageContext = {
    nodes: NodesListContract.Response['response']['nodes'],
    isLoading: boolean,
    isCreateModalOpen: boolean,
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
    const { nodes, isLoading, refetchNodes } = useGetNodes();
    
    return (
        <NodesPageContext value={ {
            nodes,
            refetchNodes,
            isLoading,
            isCreateModalOpen,
            openCreateModalOpen,
        } }>
            { children }
        </NodesPageContext>
    );
    
}