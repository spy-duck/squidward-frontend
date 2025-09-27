import { NodesPageProvider, useNodesPageContext } from '@/pages/nodes/nodes.context';
import { NodesList } from '@/features/nodes/nodes-list';
import { Button, Flex } from '@mantine/core';
import { NodeCreateModal } from '@/features/nodes/node-create-modal';
import { useSetIsEditNodeStore } from '@/entities/nodes/nodes-store';
import { NodeEditModal } from '@/features/nodes/node-edit-modal';
import { NodeRemoveModal } from '@/features/nodes/node-remove-modal';
import { IconPlus, IconRefresh } from '@tabler/icons-react';
import { PageWrapper } from '@/shared/components/ui';

function NodesPageComponent() {
    const {
        nodes,
        isCreateModalOpen,
        refetchNodes,
        openCreateModalOpen,
        isEditModalOpen,
        isRemoveModalOpen,
    } = useNodesPageContext();
    
    const setIsEdit = useSetIsEditNodeStore();
    const setIsRemove = useSetIsEditNodeStore();
    
    return (
        <PageWrapper>
            <Flex align='center'>
                <h1 style={ { flex: 1 } }>Nodes</h1>
                <Flex gap={ 14 }>
                    <Button
                        onClick={ () => openCreateModalOpen(true) }
                        leftSection={ <IconPlus size={ 16 }/> }
                    >
                        Create node
                    </Button>
                    <Button onClick={ () => refetchNodes() }>
                        <IconRefresh/>
                    </Button>
                </Flex>
            </Flex>
            <NodesList nodes={ nodes }/>
            <NodeCreateModal
                opened={ isCreateModalOpen }
                onClose={ () => openCreateModalOpen(false) }
                onSubmit={ () => refetchNodes() }
            />
            <NodeEditModal
                opened={ isEditModalOpen }
                onClose={ () => setIsEdit(false) }
                onSubmit={ () => refetchNodes() }
            />
            <NodeRemoveModal
                opened={ isRemoveModalOpen }
                onClose={ () => setIsRemove(false) }
                onSubmit={ () => refetchNodes() }
            />
        </PageWrapper>
    )
}

export function NodesPage() {
    return (
        <NodesPageProvider>
            <NodesPageComponent/>
        </NodesPageProvider>
    )
}