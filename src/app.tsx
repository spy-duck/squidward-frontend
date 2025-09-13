import { Center, DirectionProvider, MantineProvider } from '@mantine/core'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/query-core';
import { ModalsProvider } from '@mantine/modals';
import { theme } from '@/shared/theme';
import { NavigationProgress } from '@mantine/nprogress';
import { Suspense } from 'react';
import { Router } from '@/router/router';
import '@mantine/core/styles.css';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            refetchIntervalInBackground: false,
            retry: false,
            gcTime: 120 * 1_000,
            staleTime: 60 * 1_000
        },
        mutations: {
            retry: false
        }
    }
})


export function App() {
return (
    <QueryClientProvider client={queryClient}>
        <DirectionProvider>
            <MantineProvider defaultColorScheme="dark" theme={theme}>
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