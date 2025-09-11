import { NodesPageProvider, useNodesPageContext } from '@/pages/nodes/nodes.context';
import { NodesList } from '@/components/nodes/nodes-list';
import { Button, Space } from '@mantine/core';
import { NodeCreateModal } from '@/components/nodes/node-create-modal';

function NodesPageComponent() {
    const { nodes, openCreateModalOpen, isCreateModalOpen, refetchNodes } = useNodesPageContext();
    return (
        <div>
            <Space >
                <h1>Nodes</h1>
                <Button onClick={() => openCreateModalOpen(true)}>Create node</Button>
            </Space>
            <NodesList nodes={nodes} />
            <NodeCreateModal
                opened={isCreateModalOpen}
                onClose={() => openCreateModalOpen(false)}
                onSubmit={() => refetchNodes()}
            />
        </div>
    )
}

export function NodesPage() {
    return (
        <NodesPageProvider>
            <NodesPageComponent/>
        </NodesPageProvider>
    )
}