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
import { queryClient, useGetOneConfig, useUpdateConfig } from '@/shared/api';
import { useActionConfigStore, useResetActionConfigStore } from '@/entities/configs/configs-store';
import { ConfigUpdateContract } from '@squidward/contracts/commands';
import { ConfigEditor } from '@/shared/components/ui/config-editor';
import { QUERY_KEYS } from '@/shared/constants/api';

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
        <Modal { ...modalProps } onClose={closeHandler} title='Edit squid config' size='xl' centered>
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
        </Modal>
    );
}