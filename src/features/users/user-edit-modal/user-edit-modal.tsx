import React, { useEffect } from 'react';
import {
    Button,
    Group,
    Modal,
    NativeSelect,
    NumberInput,
    PasswordInput,
    Stack,
    TextInput,
} from '@mantine/core';
import type { ModalBaseProps } from '@mantine/core';
import { type TransformedValues, useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useUpdateUser } from '@/shared/api';
import { useActionUserStore, useResetActionUserStore } from '@/entities/users/users-store';
import { UserUpdateContract } from '@squidward/contracts/commands';
import { USER_STATUS_VALUES } from '@squidward/contracts/constants';
import { DateTimePicker } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { z } from 'zod';

type NodeCreateModalProps = ModalBaseProps & {
    onSubmit(): void;
};

export function UserEditModal({ onSubmit, ...modalProps }: NodeCreateModalProps): React.ReactElement {
    const { updateUser, isPending } = useUpdateUser({
        onSuccess() {
            modalProps.onClose();
            onSubmit();
        },
    });
    
    const user = useActionUserStore();
    const resetAction = useResetActionUserStore();
    
    const form = useForm<UserUpdateContract.Request>({
        mode: 'uncontrolled',
        validate: zod4Resolver(
            UserUpdateContract.RequestSchema
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
                        .optional()
                        .or(
                            z
                                .iso
                                .date()
                                .refine(
                                    (isoString) => {
                                        const date = dayjs(isoString);
                                        return date.isValid();
                                    },
                                    {
                                        message: `Date must be an ISO string and not earlier than ${ dayjs().toISOString() }`,
                                    },
                                )
                                .optional(),
                        ),
                }),
        ),
        transformValues(values) {
            const dirtyFields: Partial<Record<keyof UserUpdateContract.Request, boolean>> = form.getDirty();
            console.log({dirtyFields})
            return {
                ...values,
                telegramId: values.telegramId || null,
                email: values.email?.trim() || null,
                expireAt: dirtyFields.expireAt ? dayjs(values.expireAt).toDate() : undefined,
            }
        },
    });
    
    useEffect(() => {
        if (modalProps.opened && user) {
            form.setValues({
                uuid: user.uuid,
                name: user.name,
                username: user.username,
                password: user.password,
                status: user.status,
                email: user.email,
                telegramId: user.telegramId,
                expireAt: user.expireAt,
            });
            
        }
    }, [ modalProps.opened ]);
    
    function closeHandler() {
        resetAction();
        form.reset();
        modalProps.onClose();
    }
    
    function submitHandler(values: TransformedValues<typeof form>) {
        updateUser(values);
    }
    
    return (
        <Modal { ...modalProps } onClose={ closeHandler } title='Edit user' centered>
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
                        autoComplete='new-password'
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
                        autoComplete='new-password'
                    />
                    <NativeSelect
                        label='Status'
                        key={ form.key('status') }
                        { ...form.getInputProps('status') }
                        disabled={ isPending }
                        data={ USER_STATUS_VALUES }
                    />
                    <DateTimePicker
                        leftSection={ <IconCalendar size={ 18 } stroke={ 1.5 }/> }
                        label='Expire at'
                        key={ form.key('expireAt') }
                        { ...form.getInputProps('expireAt') }
                        disabled={ isPending }
                        onChange={ (date) => {
                            const formInputProps = form.getInputProps('expireAt')
                            if (formInputProps.onChange) {
                                formInputProps.onChange(dayjs(date, 'DD MMM YYYY hh:mm').toDate());
                            }
                        } }
                        minDate={ new Date() }
                        presets={ [
                            {
                                value: dayjs().add(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
                                label: '1 month',
                            },
                            {
                                value: dayjs().add(3, 'months').format('YYYY-MM-DD HH:mm:ss'),
                                label: '3 months',
                            },
                            {
                                value: dayjs().add(1, 'year').format('YYYY-MM-DD HH:mm:ss'),
                                label: '1 year',
                            },
                        ] }
                        highlightToday
                    />
                </Stack>
                <Group justify='flex-end' mt='md'>
                    <Button type='submit' loading={ isPending }>Save</Button>
                </Group>
            </form>
        </Modal>
    );
}