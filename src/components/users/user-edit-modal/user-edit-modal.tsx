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
import { DatePickerInput } from '@mantine/dates';

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
        validate: zod4Resolver(UserUpdateContract.RequestSchema),
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
        <Modal { ...modalProps } onClose={closeHandler} title='Edit user'>
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
                    />
                    <PasswordInput
                        withAsterisk
                        label='Password'
                        placeholder='Some strong password'
                        key={ form.key('password') }
                        { ...form.getInputProps('password') }
                        readOnly={ isPending }
                    />
                    <TextInput
                        label='Email'
                        placeholder='user@example.com'
                        key={ form.key('email') }
                        { ...form.getInputProps('email') }
                        readOnly={ isPending }
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
                        label='Expire at'
                        key={ form.key('expireAt') }
                        { ...form.getInputProps('expireAt') }
                        disabled={ isPending }
                    />
                </Stack>
                <Group justify='flex-end' mt='md'>
                    <Button type='submit' loading={ isPending }>Save</Button>
                </Group>
            </form>
        </Modal>
    );
}