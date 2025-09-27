import React from 'react';
import { Button, Group, Modal } from '@mantine/core';
import type { ModalBaseProps } from '@mantine/core';
import { useActionApiTokenStore, useResetActionApiTokenStore } from '@/entities';
import { useRemoveApiToken } from '@/shared/api';

type ApiTokenRemoveModalProps = ModalBaseProps & {
    onSubmit(): void;
};

export function ApiTokenRemoveModal({ onSubmit, ...modalProps }: ApiTokenRemoveModalProps): React.ReactElement {
    const { removeApiToken, isPending } = useRemoveApiToken({
        onSuccess() {
            modalProps.onClose();
            onSubmit();
        },
    });
    
    const apiToken = useActionApiTokenStore();
    const resetActionNode = useResetActionApiTokenStore();
    
    function confirmClickHandler() {
        if (!apiToken) return;
        removeApiToken(apiToken.uuid!);
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
            Confirm delete API token "{ apiToken?.tokenName }"
            <Group justify='flex-end' mt='md'>
                <Button type='submit' loading={ isPending } color='red' onClick={ confirmClickHandler }>Delete</Button>
                <Button type='submit' loading={ isPending } color='gray' onClick={ cancelClickHandler }>Cancel</Button>
            </Group>
        </Modal>
    );
}