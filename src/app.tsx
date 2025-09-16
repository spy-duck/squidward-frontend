import { Center, DirectionProvider, MantineProvider } from '@mantine/core'
import { QueryClientProvider } from '@tanstack/react-query'
import { ModalsProvider } from '@mantine/modals';
import { theme } from '@/shared/theme';
import { NavigationProgress } from '@mantine/nprogress';
import { Suspense } from 'react';
import { Router } from '@/router/router';
import { queryClient } from '@/shared/api';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';



export function App() {
return (
    <QueryClientProvider client={queryClient}>
        <DirectionProvider>
            <MantineProvider defaultColorScheme="dark" theme={theme}>
                <Notifications
                    position='top-right'
                />
                <ModalsProvider>
                    <NavigationProgress />
                    <Suspense
                        fallback={
                            <Center h={'100%'}>
                                LoadingScreen
                            </Center>
                        }
                    >
                        <Router />
                    </Suspense>
                </ModalsProvider>
            </MantineProvider>
        </DirectionProvider>
    </QueryClientProvider>
)
}