import React, { useState } from 'react';
import { type TransformedValues, useForm } from '@mantine/form';
import { AdminChangeCredentialsContract } from '@squidward/contracts/commands';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, CopyButton, Flex, PasswordInput, TextInput } from '@mantine/core';
import { IconCopy, IconDice5 } from '@tabler/icons-react';
import { generate as generatePassword } from 'generate-password-ts';
import { useDisclosure } from '@mantine/hooks';
import { useAdminChangeCredentials } from '@/shared/api/hooks/admin';
import { credentialsChangedEvents } from '@/shared/emmiters';

type AdminCredentialsChangeFormProps = {};

export function AdminCredentialsChangeForm({}: AdminCredentialsChangeFormProps): React.ReactElement {
    const [ visible, { toggle } ] = useDisclosure(false);
    const [ isPasswordGenerated, setIsPasswordGenerated ] = useState(false);
    const { adminChangeCredentials, isLoading } = useAdminChangeCredentials();
    
    const form = useForm<AdminChangeCredentialsContract.Request>({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: '',
            rePassword: '',
        },
        validate: zod4Resolver(AdminChangeCredentialsContract.RequestSchema),
        transformValues: (values) => ({
            password: values.password.trim(),
            rePassword: values.rePassword.trim(),
            username: values.username.trim(),
        }),
    });
    
    async function submitHandler(values: TransformedValues<typeof form>) {
        const { success } = await adminChangeCredentials(values);
        if (success) {
            credentialsChangedEvents.emit();
        }
    }
    
    
    function generatePasswordHandler() {
        const password = generatePassword({
            length: 24,
            numbers: true,
            symbols: true,
            uppercase: true,
            lowercase: true,
            strict: true,
        });
        form.setFieldValue('password', password);
        form.setFieldValue('rePassword', password);
        toggle();
        setIsPasswordGenerated(true);
    }
    
    console.log(form.errors)
    return (
        <form onSubmit={ form.onSubmit(submitHandler) }>
            <Flex gap={ 18 } direction='column'>
                <TextInput
                    autoComplete='new-password'
                    label='Username'
                    key={ form.key('username') }
                    { ...form.getInputProps('username') }
                    readOnly={ isLoading }
                    withAsterisk
                />
                <PasswordInput
                    autoComplete='new-password'
                    label='Password'
                    placeholder='Some strong password'
                    key={ form.key('password') }
                    { ...form.getInputProps('password') }
                    visible={ visible }
                    onVisibilityChange={ toggle }
                    readOnly={ isLoading }
                    withAsterisk
                />
                <PasswordInput
                    autoComplete='new-password'
                    label='Password'
                    placeholder='Some strong password'
                    key={ form.key('rePassword') }
                    { ...form.getInputProps('rePassword') }
                    visible={ visible }
                    onVisibilityChange={ toggle }
                    readOnly={ isLoading }
                    withAsterisk
                />
                <Flex gap={ 14 }>
                    <Button
                        leftSection={ <IconDice5 size={ 16 }/> }
                        size='xs'
                        color='gray'
                        style={ { opacity: 0.5 } }
                        onClick={ generatePasswordHandler }
                        disabled={ isLoading }
                    >
                        Random password
                    </Button>
                    { isPasswordGenerated && (
                        <CopyButton value={ form.values.password }>
                            { ({ copied, copy }) => (
                                <Button
                                    leftSection={ (
                                        <IconCopy/>
                                    ) }
                                    color={ copied ? 'teal' : 'blue' }
                                    onClick={ copy }
                                    size='xs'
                                    style={ { opacity: 0.7 } }
                                    disabled={ isLoading }
                                >
                                    Copy password
                                </Button>
                            ) }
                        </CopyButton>
                    ) }
                </Flex>
                <Button type='submit' loading={ isLoading }>Save</Button>
            </Flex>
        </form>
    );
}