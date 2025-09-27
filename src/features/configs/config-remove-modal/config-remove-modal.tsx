import React from 'react';
import { Button, Group, Modal } from '@mantine/core';
import type { ModalBaseProps } from '@mantine/core';
import { useActionConfigStore, useResetActionConfigStore } from '@/entities/configs/configs-store';
import { useRemoveConfig } from '@/shared/api';

type ConfigRemoveModalProps = ModalBaseProps & {
    onSubmit(): void;
};

export function ConfigRemoveModal({ onSubmit, ...modalProps }: ConfigRemoveModalProps): React.ReactElement {
    const { removeConfig, isPending } = useRemoveConfig({
        onSuccess() {
            modalProps.onClose();
            onSubmit();
        },
    });
    
    const config = useActionConfigStore();
    const resetAction = useResetActionConfigStore();
    
    function confirmClickHandler() {
        if (!config) return;
        removeConfig(config.uuid!);
    }
    
    function cancelClickHandler() {
        modalProps.onClose();
    }
    
    function closeHandler() {
        resetAction();
        modalProps.onClose();
    }
    
    return (
        <Modal { ...modalProps } onClose={ closeHandler } title='Confirm delete config' centered>
            Confirm delete config "{ config?.name }"
            <Group justify='flex-end' mt='md'>
                <Button type='submit' loading={ isPending } color='red' onClick={ confirmClickHandler }>Delete</Button>
                <Button type='submit' loading={ isPending } color='gray' onClick={ cancelClickHandler }>Cancel</Button>
            </Group>
        </Modal>
    );
}