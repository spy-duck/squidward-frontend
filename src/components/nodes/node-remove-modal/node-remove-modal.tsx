import React from 'react';
import { Button, Group, Modal } from '@mantine/core';
import type { ModalBaseProps } from '@mantine/core';
import { useActionNodeStore, useResetActionNodeStore } from '@/entities/nodes/nodes-store';
import { useRemoveNode } from '@/shared/api/hooks/use-remove-node';

type NodeCreateModalProps = ModalBaseProps & {
    onSubmit(): void;
};

export function NodeRemoveModal({ onSubmit, ...modalProps }: NodeCreateModalProps): React.ReactElement {
    const { removeNode, isPending } = useRemoveNode({
        onSuccess() {
            modalProps.onClose();
            onSubmit();
        },
    });
    
    const node = useActionNodeStore();
    const resetActionNode = useResetActionNodeStore();
    
    function confirmClickHandler() {
        if (!node) return;
        removeNode(node.uuid);
    }
    
    function cancelClickHandler() {
        modalProps.onClose();
    }
    
    function closeHandler() {
        resetActionNode();
        modalProps.onClose();
    }
    
    return (
        <Modal { ...modalProps } onClose={ closeHandler } title='Confirm delete node'>
            Confirm delete node "{ node?.name }"
            <Group justify='flex-end' mt='md'>
                <Button type='submit' loading={ isPending } color='red' onClick={ confirmClickHandler }>Delete</Button>
                <Button type='submit' loading={ isPending } color='gray' onClick={ cancelClickHandler }>Cancel</Button>
            </Group>
        </Modal>
    );
}