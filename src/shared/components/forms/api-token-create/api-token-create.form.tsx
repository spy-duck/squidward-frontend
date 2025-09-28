import React from 'react';
import { ApiTokenCreateContract } from '@squidward/contracts/commands';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, Group, Stack, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { z } from 'zod';
import { IconCalendar } from '@tabler/icons-react';

type ApiTokenCreateFormProps = {
    onSubmit: (values: ApiTokenCreateContract.Request) => void;
    isPending: boolean;
};

export function ApiTokenCreateForm({ onSubmit, isPending }: ApiTokenCreateFormProps): React.ReactElement {
    
    const form = useForm<ApiTokenCreateContract.Request>({
        mode: 'uncontrolled',
        initialValues: {
            tokenName: '',
            expireAt: dayjs().add(1, 'year').toDate(),
        },
        validate: zod4Resolver(
            ApiTokenCreateContract.RequestSchema
                .extend({
                    expireAt: z
                        .date()
                        .min(dayjs().add(1, 'day').toDate())
                        .or(
                            z
                                .iso
                                .date()
                                .refine(
                                    (isoString) => {
                                        const date = dayjs(isoString);
                                        return date.isValid() && date > dayjs().add(1, 'day');
                                    },
                                    {
                                        message: `Date must be an ISO string and not earlier than ${dayjs().add(1, 'day').toISOString()}`,
                                    }
                                )
                        )
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
                <DateInput
                    leftSection={<IconCalendar size={18} stroke={1.5} />}
                    label='Expire at'
                    // minDate={dayjs().add(1, 'day').format('YYYY-MM-DD')}
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