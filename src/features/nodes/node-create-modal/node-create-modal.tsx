import React, { useEffect } from 'react';
import { Button, CopyButton, Fieldset, Grid, Group, Modal, Stack } from '@mantine/core';
import type { ModalBaseProps } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NodeCreateContract } from '@squidward/contracts/commands';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useCreateNode, useGetConfigs, useKeygenNodes } from '@/shared/api';
import { IconCopy } from '@tabler/icons-react';
import { NodeBaseForm } from '@/shared/components/forms';
import { NodeProxyForm } from '@/shared/components/forms/node-proxy-form';

type NodeCreateModalProps = ModalBaseProps & {
    onSubmit(): void;
};

export function NodeCreateModal({ onSubmit, ...modalProps }: NodeCreateModalProps): React.ReactElement {
    const { publicKey, isLoading } = useKeygenNodes({
        enabled: modalProps.opened,
    });
    
    const { createNode, isPending } = useCreateNode({
        onSuccess() {
            modalProps.onClose();
            onSubmit();
        },
    });
    
    const { refetchConfigs } = useGetConfigs();
    
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
        <Modal { ...modalProps } title='Create new node' size={1200} centered>
            <form onSubmit={ form.onSubmit((values) => {
                createNode(values);
            }) }>
                <Stack
                    align='stretch'
                    justify='center'
                    gap='md'
                >
                    <Fieldset legend='Node SSL config'>
                        Copy SSL_CERT param and add this to <i>.env</i> on node <br/>
                        <CopyButton value={ `SSL_CERT="${ publicKey }"` }>
                            { ({ copied, copy }) => (
                                <Button
                                    leftSection={(
                                        <IconCopy/>
                                    )}
                                    color={ copied ? 'teal' : 'blue' }
                                    onClick={ copy }
                                    disabled={ isLoading }
                                >
                                    Copy
                                </Button>
                            ) }
                        </CopyButton>
                    </Fieldset>
                    <Grid>
                        <Grid.Col span={ { base: 12, lg: 6, md: 6 } }>
                            <Fieldset legend='Node settings'>
                                <NodeBaseForm form={ form } isPending={ isPending }/>
                            </Fieldset>
                        </Grid.Col>
                        <Grid.Col span={ { base: 12, lg: 6, md: 6 } }>
                            <Fieldset legend='Node proxy settings'>
                                <NodeProxyForm form={ form } isPending={ isPending }/>
                            </Fieldset>
                        </Grid.Col>
                    </Grid>
                </Stack>
                <Group justify='flex-end' mt='md'>
                    <Button type='submit' loading={ isPending }>Create</Button>
                </Group>
            </form>
        </Modal>
    );
}