import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useGetNodes } from '@/common/api/hooks/use-get-nodes';
import { NodesListContract } from 'contracts/commands';

type TNodesPageContext = {
    nodes: NodesListContract.Response
};


export const NodesPageContext = createContext<TNodesPageContext>({})

export const useNodesPageContext = () => useContext(NodesPageContext);

type TNodesPageContextProps = {
    children?: ReactNode
};
export const NodesPageProvider = ({ children }: TNodesPageContextProps) => {
    const [ isCreateModalOpen, openCreateModalOpen ] = useState(false);
    const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
    const { nodes, isLoading } = useGetNodes();
    return (
        <NodesPageContext value={ {
            nodes,
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