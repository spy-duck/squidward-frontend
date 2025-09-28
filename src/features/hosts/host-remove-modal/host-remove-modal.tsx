import React from 'react';
import { Button, Group, Modal } from '@mantine/core';
import type { ModalBaseProps } from '@mantine/core';
import { useActionHostStore, useResetActionHostStore } from '@/entities';
import { useRemoveHost } from '@/shared/api';

type HostRemoveModalProps = ModalBaseProps & {
    onSubmit(): void;
};

export function HostRemoveModal({ onSubmit, ...modalProps }: HostRemoveModalProps): React.ReactElement {
    const { removeHost, isPending } = useRemoveHost({
        onSuccess() {
            modalProps.onClose();
            onSubmit();
        },
    });
    
    const apiToken = useActionHostStore();
    const resetActionNode = useResetActionHostStore();
    
    function confirmClickHandler() {
        if (!apiToken) return;
        removeHost(apiToken.uuid!);
    }
    
    function cancelClickHandler() {
        modalProps.onClose();
    }
    
    function closeHandler() {
        resetActionNode();
        modalProps.onClose();
    }
    
    return (
        <Modal { ...modalProps } onClose={ closeHandler } title='Confirm delete host' centered>
            Confirm delete host "{ apiToken?.name }"
            <Group justify='flex-end' mt='md'>
                <Button type='submit' loading={ isPending } color='red' onClick={ confirmClickHandler }>Delete</Button>
                <Button type='submit' loading={ isPending } color='gray' onClick={ cancelClickHandler }>Cancel</Button>
            </Group>
        </Modal>
    );
}