import React, { useEffect } from 'react';
import { Button, Group, Modal, NumberInput, Select, Stack, TextInput } from '@mantine/core';
import type { ModalBaseProps } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NodeUpdateContract } from '@squidward/contracts/commands';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useGetConfigs, useUpdateNode } from '@/shared/api';
import { useActionNodeStore, useResetActionNodeStore } from '@/entities/nodes/nodes-store';

type NodeCreateModalProps = ModalBaseProps & {
    onSubmit(): void;
};

export function NodeEditModal({ onSubmit, ...modalProps }: NodeCreateModalProps): React.ReactElement {
    const { updateNode, isPending } = useUpdateNode({
        onSuccess() {
            modalProps.onClose();
            onSubmit();
        },
    });
    
    const { configs, refetchConfigs } = useGetConfigs();
    
    const node = useActionNodeStore();
    const resetAction = useResetActionNodeStore();
    
    const form = useForm<NodeUpdateContract.Request>({
        mode: 'uncontrolled',
        validate: zod4Resolver(NodeUpdateContract.RequestSchema),
    });
    
    useEffect(() => {
        if (modalProps.opened && node) {
            form.setValues({
                uuid: node.uuid,
                name: node.name,
                host: node.host,
                port: node.port,
                configId: node.configId,
                description: node.description || '',
            });
            ;(async () => {
                await refetchConfigs();
            })();
        }
    }, [ modalProps.opened, node, refetchConfigs ]);
    
    function closeHandler() {
        resetAction();
        form.reset();
        modalProps.onClose();
    }
    
    return (
        <Modal { ...modalProps } onClose={ closeHandler } title='Edit node' size='sm' centered>
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
                    <Select
                        label='Squid config'
                        placeholder='Pick squid config'
                        data={ configs?.map((config) => ({
                            value: config.uuid, label: config.name,
                        })) }
                        key={ form.key('configId') }
                        { ...form.getInputProps('configId') }
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