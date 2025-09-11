import { createContext, type Dispatch, type SetStateAction, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useGetNodes } from '@/common/api/hooks/use-get-nodes';
import { NodesListContract } from '@swuidward/contracts/commands';

type TNodesPageContext = {
    nodes: NodesListContract.Response['response']['nodes'],
    isLoading: boolean,
    isCreateModalOpen: boolean,
    isEditModalOpen: boolean,
    openCreateModalOpen: Dispatch<SetStateAction<boolean>>,
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>,
    refetchNodes(): void,
};


export const NodesPageContext = createContext<TNodesPageContext>({} as TNodesPageContext)

export const useNodesPageContext = () => useContext(NodesPageContext);

type TNodesPageContextProps = {
    children?: ReactNode
};
export const NodesPageProvider = ({ children }: TNodesPageContextProps) => {
    const [ isCreateModalOpen, openCreateModalOpen ] = useState(false);
    const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
    const { nodes, isLoading, refetchNodes } = useGetNodes();
    
    return (
        <NodesPageContext value={ {
            nodes,
            refetchNodes,
            isLoading,
            isCreateModalOpen,
            isEditModalOpen,
            openCreateModalOpen,
            setIsEditModalOpen,
        } }>
            { children }
        </NodesPageContext>
    );
    
}