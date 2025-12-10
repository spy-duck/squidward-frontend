import React, { useEffect } from 'react';
import { Button, Fieldset, Grid, Group, Modal } from '@mantine/core';
import type { ModalBaseProps } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NodeUpdateContract } from '@squidward/contracts/commands';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { queryClient, useUpdateNode } from '@/shared/api';
import { useActionNodeStore, useResetActionNodeStore } from '@/entities/nodes/nodes-store';
import { NodeBaseForm } from '@/shared/components/forms/node-base-form';
import { QUERY_KEYS } from '@/shared/constants';
import { NodeProxyForm } from '@/shared/components/forms/node-proxy-form';

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
                countryCode: node.countryCode,
                configId: node.configId,
                description: node.description || '',
                httpPort: node.httpPort,
                httpsEnabled: node.httpsEnabled,
                httpsPort: node.httpsPort,
                speedLimitEnabled: node.speedLimitEnabled,
                speedLimit: node.speedLimit,
            });
            ;(async () => {
                await queryClient.prefetchQuery({
                    queryKey: QUERY_KEYS.CONFIGS.CONFIGS_LIST,
                })
            })();
        }
    }, [ modalProps.opened, node ]);
    
    function closeHandler() {
        resetAction();
        form.reset();
        modalProps.onClose();
    }
    
    return (
        <Modal { ...modalProps } onClose={ closeHandler } title='Edit node' size={1200} centered>
            <form onSubmit={ form.onSubmit((values) => {
                updateNode(values);
            }) }>
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
                <Group justify='flex-end' mt='md'>
                    <Button type='submit' loading={ isPending }>Save</Button>
                </Group>
            </form>
        </Modal>
    );
}