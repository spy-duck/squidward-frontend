import React from 'react';
import { Button, Group, Modal } from '@mantine/core';
import type { ModalBaseProps } from '@mantine/core';
import { useActionUserStore, useResetActionUserStore } from '@/entities/users/users-store';
import { useRemoveUser } from '@/shared/api';

type NodeCreateModalProps = ModalBaseProps & {
    onSubmit(): void;
};

export function UserRemoveModal({ onSubmit, ...modalProps }: NodeCreateModalProps): React.ReactElement {
    const { removeNode, isPending } = useRemoveUser({
        onSuccess() {
            modalProps.onClose();
            onSubmit();
        },
    });
    
    const user = useActionUserStore();
    const resetActionNode = useResetActionUserStore();
    
    function confirmClickHandler() {
        if (!user) return;
        removeNode(user.uuid!);
    }
    
    function cancelClickHandler() {
        modalProps.onClose();
    }
    
    function closeHandler() {
        resetActionNode();
        modalProps.onClose();
    }
    
    return (
        <Modal { ...modalProps } onClose={ closeHandler } title='Confirm delete user' centered>
            Confirm delete user "{ user?.name }"
            <Group justify='flex-end' mt='md'>
                <Button type='submit' loading={ isPending } color='red' onClick={ confirmClickHandler }>Delete</Button>
                <Button type='submit' loading={ isPending } color='gray' onClick={ cancelClickHandler }>Cancel</Button>
            </Group>
        </Modal>
    );
}