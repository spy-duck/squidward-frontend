import { Center, Flex } from '@mantine/core';
import { Outlet } from 'react-router';


export function AuthLayout() {
    return (
        <Center h={ '100vh' }>
            <Flex direction='column' justify='center' align='center' gap={ 14 }>
                <Outlet/>
            </Flex>
        </Center>
    );
}