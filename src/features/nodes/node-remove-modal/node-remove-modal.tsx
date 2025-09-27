import React from 'react';
import { Button, Group, Modal } from '@mantine/core';
import type { ModalBaseProps } from '@mantine/core';
import { useActionNodeStore, useResetActionNodeStore, useSetIsRemoveNodeStore } from '@/entities/nodes/nodes-store';
import { useRemoveNode } from '@/shared/api';

type NodeCreateModalProps = ModalBaseProps & {
    onSubmit(): void;
};

export function NodeRemoveModal({ onSubmit, ...modalProps }: NodeCreateModalProps): React.ReactElement {
    const node = useActionNodeStore();
    const setIsRemove = useSetIsRemoveNodeStore();
    const resetActionNode = useResetActionNodeStore();
    
    const { removeNode, isPending } = useRemoveNode({
        onSuccess() {
            resetActionNode();
            setIsRemove(false);
            onSubmit();
        },
    });
    
    
    function confirmClickHandler() {
        if (!node) return;
        removeNode(node.uuid!);
    }
    
    function cancelClickHandler() {
        resetActionNode();
        setIsRemove(false);
    }
    
    function closeHandler() {
        resetActionNode();
        setIsRemove(false);
    }
    
    return (
        <Modal { ...modalProps } onClose={ closeHandler } title='Confirm delete node' centered>
            Confirm delete node "{ node?.name }"
            <Group justify='flex-end' mt='md'>
                <Button type='submit' loading={ isPending } color='red' onClick={ confirmClickHandler }>Delete</Button>
                <Button type='submit' loading={ isPending } color='gray' onClick={ cancelClickHandler }>Cancel</Button>
            </Group>
        </Modal>
    );
}