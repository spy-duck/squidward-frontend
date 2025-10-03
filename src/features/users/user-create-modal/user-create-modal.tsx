import React, { useEffect } from 'react';
import { Button, Group, Modal, NativeSelect, NumberInput, PasswordInput, Stack, TextInput } from '@mantine/core';
import type { ModalBaseProps } from '@mantine/core';
import { type TransformedValues, useForm } from '@mantine/form';
import { UserCreateContract } from '@squidward/contracts/commands';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useCreateUser } from '@/shared/api';
import { USER_STATUS, USER_STATUS_VALUES } from '@squidward/contracts/constants';
import { DatePickerInput } from '@mantine/dates';
import { z } from 'zod';
import dayjs from 'dayjs';
import { IconCalendar } from '@tabler/icons-react';


type NodeCreateModalProps = ModalBaseProps & {
    onSubmit(): void;
};

export function UserCreateModal({ onSubmit, ...modalProps }: NodeCreateModalProps): React.ReactElement {
    const { createUser, isPending } = useCreateUser({
        onSuccess() {
            modalProps.onClose();
            onSubmit();
        },
    });
    
    const form = useForm<UserCreateContract.Request>({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            username: '',
            password: '',
            email: null,
            telegramId: null,
            status: USER_STATUS.ACTIVE,
            expireAt: dayjs().add(1, 'day').toDate(),
        },
        validate: zod4Resolver(
            UserCreateContract.RequestSchema
                .extend({
                    email: z.union([
                        z.literal(''),
                        z.email()
                            .optional()
                            .nullable(),
                    ]),
                    telegramId: z
                        .number()
                        .optional()
                        .nullable(),
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
                                        return date.isValid() && date > dayjs();
                                    },
                                    {
                                        message: `Date must be an ISO string and not earlier than ${dayjs().toISOString()}`,
                                    }
                                )
                        )
                }),
        ),
        transformValues(values) {
            return {
                ...values,
                telegramId: values.telegramId || null,
                email: values.email?.trim() || null,
                expireAt: dayjs(values.expireAt).toDate(),
            }
        },
    });
    
    useEffect(() => {
        if (modalProps.opened) {
            form.reset();
        }
    }, [ modalProps.opened ]);
    
    function submitHandler(values: TransformedValues<typeof form>) {
        createUser(values);
    }
    
    return (
        <Modal { ...modalProps } title='Create new user' centered>
            <form onSubmit={ form.onSubmit(submitHandler) }>
                <Stack
                    align='stretch'
                    justify='center'
                    gap='md'
                >
                    <TextInput
                        withAsterisk
                        label='Name'
                        placeholder='New user'
                        key={ form.key('name') }
                        { ...form.getInputProps('name') }
                        readOnly={ isPending }
                    />
                    <TextInput
                        withAsterisk
                        label='Namename'
                        placeholder='New user username'
                        key={ form.key('username') }
                        { ...form.getInputProps('username') }
                        readOnly={ isPending }
                        autoComplete='new-password'
                    />
                    <PasswordInput
                        withAsterisk
                        label='Password'
                        placeholder='Some strong password'
                        key={ form.key('password') }
                        { ...form.getInputProps('password') }
                        readOnly={ isPending }
                        autoComplete='new-password'
                    />
                    <TextInput
                        label='Email'
                        placeholder='user@example.com'
                        key={ form.key('email') }
                        { ...form.getInputProps('email') }
                        readOnly={ isPending }
                        autoComplete='new-password'
                    />
                    <NumberInput
                        withAsterisk
                        label='Telegram ID'
                        placeholder='1234567890'
                        key={ form.key('telegramId') }
                        { ...form.getInputProps('telegramId') }
                        readOnly={ isPending }
                    />
                    <NativeSelect
                        label='Status'
                        key={ form.key('status') }
                        { ...form.getInputProps('status') }
                        disabled={ isPending }
                        data={ USER_STATUS_VALUES }
                    />
                    <DatePickerInput
                        leftSection={<IconCalendar size={18} stroke={1.5} />}
                        label='Expire at'
                        key={ form.key('expireAt') }
                        { ...form.getInputProps('expireAt') }
                        disabled={ isPending }
                    />
                </Stack>
                <Group justify='flex-end' mt='md'>
                    <Button type='submit' loading={ isPending }>Create</Button>
                </Group>
            </form>
        </Modal>
    );
}