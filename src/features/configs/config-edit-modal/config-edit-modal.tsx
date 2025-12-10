import React, { useEffect } from 'react';
import {
    ActionIcon,
    Button, CopyButton, Flex,
    Group,
    Modal, Paper,
    Stack,
    TextInput, Tooltip,
} from '@mantine/core';
import type { ModalBaseProps } from '@mantine/core';
import { type TransformedValues, useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { queryClient, useGetOneConfig, useUpdateConfig } from '@/shared/api';
import { useActionConfigStore, useResetActionConfigStore } from '@/entities/configs/configs-store';
import { ConfigUpdateContract } from '@squidward/contracts/commands';
import { ConfigEditor } from '@/shared/components/ui/config-editor';
import { QUERY_KEYS } from '@/shared/constants/api';
import { IconCheck, IconCopy } from '@tabler/icons-react';

type ConfigEditModalProps = ModalBaseProps & {
    onSubmit(): void;
};

export function ConfigEditModal({ onSubmit, ...modalProps }: ConfigEditModalProps): React.ReactElement {
    const { updateConfig, isPending } = useUpdateConfig({
        async onSuccess() {
            modalProps.onClose();
            await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CONFIGS.CONFIG_ITEM(actionConfig?.uuid || '') });
            onSubmit();
        },
    });
    
    const actionConfig = useActionConfigStore();
    
    const { config, isLoading: isLoadingConfig } = useGetOneConfig({
        uuid: actionConfig?.uuid || '',
    });
    
    const resetAction = useResetActionConfigStore();
    
    const form = useForm<ConfigUpdateContract.Request>({
        mode: 'uncontrolled',
        validate: zod4Resolver(ConfigUpdateContract.RequestSchema),
    });
    
    useEffect(() => {
        if (modalProps.opened && actionConfig) {
            ;(async () => {
                await queryClient.prefetchQuery({
                    queryKey: QUERY_KEYS.CONFIGS.CONFIG_ITEM(actionConfig.uuid!),
                });
            })();
        }
    }, [ modalProps.opened, actionConfig ]);
    
    useEffect(() => {
        if (actionConfig && config) {
            form.setValues({
                uuid: actionConfig.uuid,
                name: actionConfig.name,
                config: config.config,
            });
        }
    }, [ actionConfig, config ]);
    
    function closeHandler() {
        resetAction();
        form.reset();
        modalProps.onClose();
    }
    
    function submitHandler(values: TransformedValues<typeof form>) {
        updateConfig(values);
    }
    
    return (
        <Modal { ...modalProps } onClose={ closeHandler } title='Edit squid config' size={ 1400 } centered>
            <Flex gap={14} wrap='wrap'>
                <form onSubmit={ form.onSubmit(submitHandler) } style={{ flex: 1}}>
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
                            readOnly={ isLoadingConfig || isPending }
                        />
                        <ConfigEditor
                            value={ form.values.config }
                            error={ form.errors.config }
                            onChange={ (value) => form.setFieldValue('config', value || '') }
                            disabled={ isLoadingConfig }
                        />
                    </Stack>
                    <Group justify='flex-end' mt='md'>
                        <Button
                            type='submit'
                            loading={ isPending }
                            disabled={ isLoadingConfig }
                        >Save</Button>
                    </Group>
                </form>
                <Paper withBorder p='md'>
                    <h3>Templates</h3>
                    <Template
                        pattern='node.httpPort'
                        description='Proxy HTTP port'
                    />
                    <Template
                        pattern='node.httpsPort'
                        description='Proxy HTTPS port'
                    />
                    <Template
                        pattern='node.httpsEnabled'
                        description='Is HTTPS proxy enabled on node'
                    />
                    <Template
                        pattern='node.speedLimitEnabled'
                        description='Is speed limit enabled on node'
                    />
                    <Template
                        pattern='node.speedLimit'
                        description='Speed limit'
                    />
                </Paper>
            </Flex>
        </Modal>
    );
}

function Template({ pattern, description }: { pattern: string, description: string }): React.ReactElement {
    return (
        <Flex align='center' gap={ 7 }>
            { `{{ ${ pattern } }}` }
            <CopyButton value={ `{{ ${ pattern } }}` } timeout={ 2000 }>
                { ({ copied, copy }) => (
                    <Tooltip label={ copied ? 'Copied' : 'Copy' } withArrow position='right'>
                        <ActionIcon color={ copied ? 'teal' : 'gray' } variant='subtle' onClick={ copy }>
                            { copied ? <IconCheck size={ 14 }/> : <IconCopy size={ 14 }/> }
                        </ActionIcon>
                    </Tooltip>
                ) }
            </CopyButton>
            &mdash; { description }
        </Flex>
    )
}