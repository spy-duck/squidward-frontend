import React, { useEffect } from 'react';
import { Button, Group, Modal, NumberInput, Select, Stack, TextInput } from '@mantine/core';
import type { ModalBaseProps } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NodeCreateContract } from '@squidward/contracts/commands';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useCreateNode, useGetConfigs } from '@/shared/api';

type NodeCreateModalProps = ModalBaseProps & {
    onSubmit(): void;
};

export function NodeCreateModal({ onSubmit, ...modalProps }: NodeCreateModalProps): React.ReactElement {
    const { createNode, isPending } = useCreateNode({
        onSuccess() {
            modalProps.onClose();
            onSubmit();
        },
    });
    
    const { configs, refetchConfigs } = useGetConfigs();
    
    const form = useForm<NodeCreateContract.Request>({
        mode: 'uncontrolled',
        validate: zod4Resolver(NodeCreateContract.RequestSchema),
    });
    
    useEffect(() => {
        if (modalProps.opened) {
            form.reset();
            ;(async () => {
                await refetchConfigs();
            })();
        }
    }, [ modalProps.opened, refetchConfigs ]);
    
    return (
        <Modal { ...modalProps } title='Create new node' centered>
            <form onSubmit={ form.onSubmit((values) => {
                createNode(values);
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
                        label="Squid config"
                        placeholder="Pick squid config"
                        data={configs?.map((config) => ({
                            value: config.uuid, label: config.name,
                        }))}
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
                    <Button type='submit' loading={ isPending }>Create</Button>
                </Group>
            </form>
        </Modal>
    );
}