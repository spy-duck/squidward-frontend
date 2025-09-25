import { Center, Flex, Loader } from '@mantine/core';

export function LoadingLayout() {
    return (
        <Center h={ '100vh' }>
            <Flex direction='column' justify='center' align='center' gap={14}>
                <Loader color='cyan'/>
                <div>
                    Loading
                </div>
            </Flex>
        </Center>
    )
}