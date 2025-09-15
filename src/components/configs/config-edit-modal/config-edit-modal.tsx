import React, { useEffect } from 'react';
import {
    Button,
    Group,
    Modal,
    Stack,
    TextInput,
} from '@mantine/core';
import type { ModalBaseProps } from '@mantine/core';
import { type TransformedValues, useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useUpdateConfig } from '@/shared/api';
import { useActionConfigStore, useResetActionConfigStore } from '@/entities/configs/configs-store';
import { ConfigUpdateContract } from '@squidward/contracts/commands';
import { ConfigEditor } from '@/shared/components/ui/config-editor';

type ConfigEditModalProps = ModalBaseProps & {
    onSubmit(): void;
};

export function ConfigEditModal({ onSubmit, ...modalProps }: ConfigEditModalProps): React.ReactElement {
    const { updateConfig, isPending } = useUpdateConfig({
        onSuccess() {
            modalProps.onClose();
            onSubmit();
        },
    });
    
    const user = useActionConfigStore();
    const resetAction = useResetActionConfigStore();
    
    const form = useForm<ConfigUpdateContract.Request>({
        mode: 'uncontrolled',
        validate: zod4Resolver(ConfigUpdateContract.RequestSchema),
    });
    
    useEffect(() => {
        if (modalProps.opened && user) {
            form.setValues({
                uuid: user.uuid,
                name: user.name,
                config: user.config,
            });
        }
    }, [ modalProps.opened ]);

    function closeHandler() {
        resetAction();
        form.reset();
        modalProps.onClose();
    }
    
    function submitHandler(values: TransformedValues<typeof form>) {
        updateConfig(values);
    }
    
    return (
        <Modal { ...modalProps } onClose={closeHandler} title='Edit user' size='xl' centered>
            <form onSubmit={ form.onSubmit(submitHandler) }>
                <Stack
                    align='stretch'
                    justify='center'
                    gap='md'
                >
                    <TextInput
                        withAsterisk
                        label='Name'
                        placeholder='Default'
                        key={ form.key('name') }
                        { ...form.getInputProps('name') }
                        readOnly={ isPending }
                    />
                    <ConfigEditor
                        value={ form.values.config }
                        error={ form.errors.config }
                        onChange={ (value) => form.setFieldValue('config', value || '') }
                    />
                </Stack>
                <Group justify='flex-end' mt='md'>
                    <Button type='submit' loading={ isPending }>Save</Button>
                </Group>
            </form>
        </Modal>
    );
}