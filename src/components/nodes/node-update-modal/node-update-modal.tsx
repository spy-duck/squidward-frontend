import React, { useEffect } from 'react';
import { Button, Group, Modal, NumberInput, Stack, TextInput } from '@mantine/core';
import type { ModalBaseProps } from '@mantine/core';
import { useForm } from '@mantine/form';
import { UpdateNodeContract } from '@swuidward/contracts/commands';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useUpdateNode } from '@/shared/api/hooks/use-update-node';
import { useEditNodeStore, useResetEditNodeStore } from '@/entities/nodes/nodes-store';

type NodeCreateModalProps = ModalBaseProps & {
    onSubmit(): void;
};

export function NodeUpdateModal({ onSubmit, ...modalProps }: NodeCreateModalProps): React.ReactElement {
    const { updateNode, isPending } = useUpdateNode({
        onSuccess() {
            modalProps.onClose();
            onSubmit();
        },
    });
    
    const node = useEditNodeStore();
    const resetEditNode = useResetEditNodeStore();
    
    const form = useForm<UpdateNodeContract.Request>({
        validate: zod4Resolver(UpdateNodeContract.RequestSchema),
    });
    
    useEffect(() => {
        if (modalProps.opened && node) {
            form.setValues({
                uuid: node.uuid,
                name: node.name,
                host: node.host,
                port: node.port,
                description: node.description,
            });
        }
    }, [ modalProps.opened ]);
    
    function closeHandler() {
        resetEditNode();
        form.reset();
        modalProps.onClose();
    }
    
    return (
        <Modal { ...modalProps } onClose={closeHandler} title='Create new node'>
            <form onSubmit={ form.onSubmit((values) => {
                updateNode(values);
            }) }>
                <Stack
                    align='stretch'
                    justify='center'
                    gap='md'
                >
                    <TextInput
                        withAsterisk
                        label='Name'
                        placeholder='My node'
                        key={ form.key('name') }
                        { ...form.getInputProps('name') }
                        readOnly={ isPending }
                    />
                    <TextInput
                        withAsterisk
                        label='Host'
                        placeholder='ip or domain'
                        key={ form.key('host') }
                        { ...form.getInputProps('host') }
                        readOnly={ isPending }
                    />
                    <NumberInput
                        withAsterisk
                        label='Port'
                        placeholder='50000'
                        key={ form.key('port') }
                        { ...form.getInputProps('port') }
                        readOnly={ isPending }
                    />
                    <TextInput
                        label='Description'
                        placeholder='My node'
                        key={ form.key('description') }
                        { ...form.getInputProps('description') }
                        readOnly={ isPending }
                    />
                </Stack>
                <Group justify='flex-end' mt='md'>
                    <Button type='submit' loading={ isPending }>Save</Button>
                </Group>
            </form>
        </Modal>
    );
}