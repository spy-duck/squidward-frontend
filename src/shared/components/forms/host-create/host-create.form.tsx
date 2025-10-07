import React from 'react';
import { HostCreateContract } from '@squidward/contracts/commands';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, Group, Select, Stack, Switch, TextInput } from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import { COUNTRIES } from '@/shared/constants';
import { useGetNodes } from '@/shared/api';

type HostCreateFormProps = {
    onSubmit: (values: HostCreateContract.Request) => void;
    isPending: boolean;
};

export function HostCreateForm({ onSubmit, isPending }: HostCreateFormProps): React.ReactElement {
    const { nodes } = useGetNodes();
    const form = useForm<HostCreateContract.Request>({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            url: '',
            countryCode: '',
            nodeId: '',
            enabled: false,
        },
        validate: zod4Resolver(
            HostCreateContract.RequestSchema,
        ),
    });
    
    return (
        <form onSubmit={ form.onSubmit(onSubmit) }>
            <Stack
                align='stretch'
                justify='center'
                gap='md'
            >
                <Switch
                    label='Enabled'
                    key={ form.key('enabled') }
                    { ...form.getInputProps('enabled') }
                    readOnly={ isPending }
                    checked={ form.values.enabled }
                />
                <TextInput
                    withAsterisk
                    label='Host name'
                    placeholder='My US host (it will be displayed to clients)'
                    key={ form.key('name') }
                    { ...form.getInputProps('name') }
                    readOnly={ isPending }
                />
                <TextInput
                    withAsterisk
                    label='Url'
                    placeholder='my.proxy-node.host'
                    key={ form.key('url') }
                    { ...form.getInputProps('url') }
                    readOnly={ isPending }
                />
                <Select
                    key={ form.key('countryCode') }
                    label='Country'
                    { ...form.getInputProps('countryCode') }
                    data={ COUNTRIES }
                    leftSection={ <IconMapPin size={ 16 }/> }
                    placeholder='Select country'
                    required
                    searchable
                    styles={ {
                        label: { fontWeight: 500 },
                    } }
                    clearable
                />
                <Select
                    label='Node'
                    placeholder='Pick node'
                    data={ nodes?.map((config) => ({
                        value: config.uuid, label: config.name,
                    })) }
                    key={ form.key('nodeId') }
                    { ...form.getInputProps('nodeId') }
                />
                
                <Group justify='flex-end' mt='md'>
                    <Button type='submit' loading={ isPending }>Create</Button>
                </Group>
            </Stack>
        </form>
    );
}