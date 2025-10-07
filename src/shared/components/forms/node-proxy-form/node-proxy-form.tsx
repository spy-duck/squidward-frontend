import React, { useState } from 'react';
import { Checkbox, NumberInput, Stack } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { NodeCreateContract, NodeUpdateContract } from '@squidward/contracts/commands';

type NodeProxyFormProps<T> = {
    form: UseFormReturnType<T>;
    isPending: boolean;
};

export function NodeProxyForm<T extends NodeUpdateContract.Request | NodeCreateContract.Request>({
    form,
    isPending,
}: NodeProxyFormProps<T>): React.ReactElement {
    const [ isHTTPSEnabled, setIsHTTPSEnabled ] = useState(false);
    
    form.watch('proxy.httpsEnabled', ({ value }) => {
        setIsHTTPSEnabled(value as boolean);
    });
    
    return (
        <Stack
            align='stretch'
            justify='center'
            gap='md'
        >
            <NumberInput
                withAsterisk
                label='HTTP port'
                placeholder='3128'
                key={ form.key('proxy.httpPort') }
                { ...form.getInputProps('proxy.httpPort') }
                readOnly={ isPending }
            />
            <Checkbox
                mt='md'
                label='HTTPS proxy enabled'
                key={ form.key('proxy.httpsEnabled') }
                { ...form.getInputProps('proxy.httpsEnabled', { type: 'checkbox' }) }
                
                style={ {
                    marginTop: -4,
                } }
            />
            <NumberInput
                label='HTTPS port'
                placeholder='3129'
                key={ form.key('proxy.httpsPort') }
                { ...form.getInputProps('proxy.httpsPort') }
                readOnly={ isPending }
                disabled={ !isHTTPSEnabled }
            />
            
            <NumberInput
                label='Speed limit per user / Mbps (empty or 0 is unlimited)'
                placeholder='1 024'
                key={ form.key('proxy.speedPerUser') }
                { ...form.getInputProps('proxy.speedPerUser') }
                readOnly={ isPending }
            />
        </Stack>
    );
}