import React from 'react';
import { ApiTokenCreateContract } from '@squidward/contracts/commands';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, Group, Stack, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { z } from 'zod';

type ApiTokenCreateProps = {
    onSubmit: (values: ApiTokenCreateContract.Request) => void;
    isPending: boolean;
};

export function ApiTokenCreateForm({ onSubmit, isPending }: ApiTokenCreateProps): React.ReactElement {
    
    const form = useForm<ApiTokenCreateContract.Request>({
        mode: 'uncontrolled',
        initialValues: {
            tokenName: '',
            expireAt: dayjs().add(1, 'year').toDate(),
        },
        validate: zod4Resolver(
            ApiTokenCreateContract.RequestSchema
                .extend({
                    expireAt: z.date().or(z.iso.date())
                }),
        ),
        transformValues: (values) => ({
            ...values,
            expireAt: dayjs(values.expireAt).endOf('date').toDate(),
        })
    });
    
    return (
        <form onSubmit={ form.onSubmit(onSubmit) }>
            <Stack
                align='stretch'
                justify='center'
                gap='md'
            >
                <TextInput
                    withAsterisk
                    label='Token name'
                    placeholder='My app name'
                    key={ form.key('tokenName') }
                    { ...form.getInputProps('tokenName') }
                    readOnly={ isPending }
                />
                <DatePickerInput
                    label='Expire at'
                    key={ form.key('expireAt') }
                    { ...form.getInputProps('expireAt') }
                    disabled={ isPending }
                />
                <Group justify='flex-end' mt='md'>
                    <Button type='submit' loading={ isPending }>Create</Button>
                </Group>
            </Stack>
        </form>
    );
}