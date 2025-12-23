import { useForm } from '@mantine/form';
import { Button, Card, em, Flex, PasswordInput, TextInput, Text } from '@mantine/core';
import React from 'react';
import { useAuthContext } from '@/shared/context/auth.context';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/shared/constants/routes';
import { IconLogin2 } from '@tabler/icons-react';
import { useAuthLogin } from '@/shared/api/hooks/auth';
import { useMediaQuery } from '@mantine/hooks';

type TForm = {
    login: string;
    password: string;
}

export function LoginPage() {
    const navigate = useNavigate();
    const { authLogin, isLoading } = useAuthLogin();
    const { login } = useAuthContext();
    const isMobile = useMediaQuery(`(max-width: ${ em(750) })`);
    
    const form = useForm<TForm>({
        mode: 'uncontrolled',
    });
    
    async function submitHandler(values: TForm) {
        const { success, accessToken } = await authLogin(values);
        
        if (success && accessToken) {
            await login(accessToken);
            navigate(ROUTES.DASHBOARD.ROOT, { replace: true });
        }
    }
    
    return (
        <Card shadow='xl' padding='xl' radius='lg' miw={ isMobile ? '100%' : 360 } w={'100%'}>
            <Flex direction={ isMobile ? 'column' : 'row' } gap={ 24 } align='center' justify='center' w='100%'>
                <Flex direction='column' align='center' gap={ 4 }>
                    <img
                        src='/logo.png'
                        width={ 160 }
                        alt='Squidward panel'
                    />
                    <Text
                        c='squidward'
                        fw={ 700 }
                    >
                        Squidward panel
                    </Text>
                </Flex>
                <form
                    onSubmit={ form.onSubmit(submitHandler) }
                    style={ { width: isMobile ? '100%' : 'auto' } }
                >
                    <Flex direction='column' gap={ 18 } w='100%' miw={ isMobile ? 0 : 280 }>
                        <TextInput
                            withAsterisk
                            label='Login'
                            key={ form.key('login') }
                            { ...form.getInputProps('login') }
                            readOnly={ isLoading }
                        />
                        <PasswordInput
                            withAsterisk
                            label='Password'
                            key={ form.key('password') }
                            { ...form.getInputProps('password') }
                            readOnly={ isLoading }
                        />
                        <Button
                            type='submit'
                            leftSection={ <IconLogin2 size={ 16 }/> }
                            loading={ isLoading }
                        >
                            Login
                        </Button>
                    </Flex>
                </form>
            </Flex>
        </Card>
    )
}