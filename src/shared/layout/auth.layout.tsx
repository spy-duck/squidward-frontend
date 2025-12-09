import { Center, em, Flex } from '@mantine/core';
import { Outlet } from 'react-router';
import { useMediaQuery } from '@mantine/hooks';


export function AuthLayout() {
    const isMobile = useMediaQuery(`(max-width: ${ em(750) })`);
    return (
        <Center h={ '100vh' } maw={'100vw'} p={ '20px' }>
            <Flex direction='column' justify='center' align='center' gap={ 14 } w={ isMobile ? '100%' : 'auto' }>
                <Outlet/>
            </Flex>
        </Center>
    );
}