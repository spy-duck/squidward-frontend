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
    const [ isHTTPSEnabled, setIsHTTPSEnabled ] = useState(form.getValues().httpsEnabled);
    
    form.watch('httpsEnabled', ({ value }) => {
        setIsHTTPSEnabled(value as boolean);
    });
    const [ isSpeedLimitEnabled, setSpeedLimitEnabled ] = useState(form.getValues().httpsEnabled);
    
    form.watch('speedLimitEnabled', ({ value }) => {
        setSpeedLimitEnabled(value as boolean);
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
                placeholder='8899'
                key={ form.key('httpPort') }
                { ...form.getInputProps('httpPort') }
                readOnly={ isPending }
            />
            <Checkbox
                mt='md'
                label='HTTPS proxy enabled'
                key={ form.key('httpsEnabled') }
                { ...form.getInputProps('httpsEnabled', { type: 'checkbox' }) }
                
                style={ {
                    marginTop: -4,
                } }
            />
            <NumberInput
                label='HTTPS port'
                placeholder='3129'
                key={ form.key('httpsPort') }
                { ...form.getInputProps('httpsPort') }
                readOnly={ isPending }
                disabled={ !isHTTPSEnabled }
            />
            
            <Checkbox
                mt='md'
                label='Speed limit enabled'
                key={ form.key('speedLimitEnabled') }
                { ...form.getInputProps('speedLimitEnabled', { type: 'checkbox' }) }
                
                style={ {
                    marginTop: -4,
                } }
            />
            <NumberInput
                label='Speed limit per user / Mbps (empty or 0 is unlimited)'
                placeholder='1 024'
                key={ form.key('speedLimit') }
                { ...form.getInputProps('speedLimit') }
                readOnly={ isPending }
                disabled={ !isSpeedLimitEnabled }
            />
        </Stack>
    );
}