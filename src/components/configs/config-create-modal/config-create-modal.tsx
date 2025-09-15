import React, { useEffect } from 'react';
import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import type { ModalBaseProps } from '@mantine/core';
import { type TransformedValues, useForm } from '@mantine/form';
import { ConfigCreateContract } from '@squidward/contracts/commands';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useCreateConfig } from '@/shared/api';
import { ConfigEditor } from '@/shared/components/ui/config-editor';

type ConfigCreateModalProps = ModalBaseProps & {
    onSubmit(): void;
};

export function ConfigCreateModal({ onSubmit, ...modalProps }: ConfigCreateModalProps): React.ReactElement {
    const { createConfig, isPending } = useCreateConfig({
        onSuccess() {
            modalProps.onClose();
            onSubmit();
        },
    });
    
    const form = useForm<ConfigCreateContract.Request>({
        mode: 'uncontrolled',
        initialValues: {
            name: 'Default',
            config: '',
        },
        validate: zod4Resolver(
            ConfigCreateContract.RequestSchema,
        ),
    });
    
    useEffect(() => {
        if (modalProps.opened) {
            form.reset();
        }
    }, [ modalProps.opened ]);
    
    function submitHandler(values: TransformedValues<typeof form>) {
        createConfig(values);
    }
    
    return (
        <Modal { ...modalProps } title='Create new user' size='xl' centered>
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
                    <Button type='submit' loading={ isPending }>Create</Button>
                </Group>
            </form>
        </Modal>
    );
}