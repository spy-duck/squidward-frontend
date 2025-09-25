import { useForm } from '@mantine/form';
import { Button, Flex, PasswordInput, TextInput } from '@mantine/core';
import React from 'react';
import { useAuthContext } from '@/shared/context/auth.context';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/shared/constants/routes';
import { useAuthLogin } from '@/shared/api/hooks/auth/use-auth-login';
import { IconLogin2 } from '@tabler/icons-react';

type TForm = {
    login: string;
    password: string;
}

export function LoginPage() {
    const navigate = useNavigate();
    const { authLogin } = useAuthLogin();
    const { login } = useAuthContext();
    
    const form = useForm<TForm>({
        mode: 'uncontrolled',
    });
    
    return (
        <form
            onSubmit={ form.onSubmit(async (values) => {
                const { success, accessToken } = await authLogin(values);
                
                if (success) {
                    login(accessToken);
                    navigate(ROUTES.DASHBOARD.ROOT);
                }
            }) }
        >
            <Flex direction='column' gap={ 18 } style={{ minWidth: 360 }}>
                <TextInput
                    withAsterisk
                    label='Login'
                    key={ form.key('login') }
                    { ...form.getInputProps('login') }
                />
                <PasswordInput
                    withAsterisk
                    label='Password'
                    key={ form.key('password') }
                    { ...form.getInputProps('password') }
                />
                <Button type='submit' leftSection={<IconLogin2 size={16}/>}>Login</Button>
            </Flex>
        </form>
    )
}