import React from 'react';
import { NumberInput, Select, Stack, TextInput } from '@mantine/core';
import { COUNTRIES } from '@/shared/constants';
import { IconMapPin } from '@tabler/icons-react';
import type { UseFormReturnType } from '@mantine/form';
import { useGetConfigs } from '@/shared/api';
import { NodeCreateContract, NodeUpdateContract } from '@squidward/contracts/commands';

type NodeBaseFormProps<T> = {
    form: UseFormReturnType<T>;
    isPending: boolean;
};

export function NodeBaseForm<T extends NodeUpdateContract.Request | NodeCreateContract.Request>({
    form,
    isPending,
}: NodeBaseFormProps<T>): React.ReactElement {
    const { configs } = useGetConfigs();
    
    return (
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
                label='API port'
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
    );
}