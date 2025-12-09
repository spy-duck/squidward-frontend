import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { AppShell, Avatar, Burger, Button, em, Flex, Group, NavLink, Text } from '@mantine/core';
import { Outlet, NavLink as RouterLink } from 'react-router';
import { ROUTES } from '@/shared/constants/routes';
import { motion } from 'framer-motion'
import { IconLogout } from '@tabler/icons-react';
import { useAuthContext } from '@/shared/context/auth.context';
import { ChangeAdminCredentialsModal } from '@/shared/components/ui/change-admin-credentials-modal';

export function AppLayout() {
    const [ opened, { toggle, close } ] = useDisclosure();
    const { logout, isChangePasswordRequired } = useAuthContext();
    const isMobile = useMediaQuery(`(max-width: ${ em(750) })`);
    
    const navLinks = [
        {
            label: 'Users',
            to: ROUTES.DASHBOARD.USERS.ROOT,
        },
        {
            label: 'Hosts',
            to: ROUTES.DASHBOARD.HOSTS.ROOT,
        },
        {
            label: 'Nodes',
            to: ROUTES.DASHBOARD.NODES.ROOT,
        },
        {
            label: 'Squid configs',
            to: ROUTES.DASHBOARD.SQUID.CONFIGS,
        },
        {
            label: 'API tokens',
            to: ROUTES.DASHBOARD.API_TOKENS.ROOT,
        },
    ]
    
    return (
        <AppShell
            header={ { height: 60 } }
            navbar={ { width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } } }
            padding='md'
        >
            {isChangePasswordRequired && (
                <ChangeAdminCredentialsModal />
            )}
            <AppShell.Header>
                <Group h='100%' px='md'>
                    <Burger opened={ opened } onClick={ toggle } hiddenFrom='sm' size='sm'/>
                    <Flex style={ { flex: 1 } } align='center' gap={14}>
                        <Avatar src='/logo.webp' radius="xl" />
                        <Text
                            size={ isMobile ? 'sm' : 'xl' }
                            fw={700}
                            c='white'
                        >
                            Squidward Dashboard
                        </Text>
                    </Flex>
                    <Button onClick={ () => logout() }>
                        <IconLogout size={ 16 }/>
                    </Button>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p='md'>
                { navLinks.map(({ label, to }, index) => (
                    <motion.div
                        key={ to }
                        initial={ {
                            opacity: 0,
                            translateY: -5,
                        } }
                        animate={ {
                            opacity: 1,
                            translateY: 0,
                        } }
                        transition={ {
                            duration: 0.5,
                            ease: [ 0, 0.71, 0.2, 1.01 ],
                            delay: (index + 1) / 15,
                        } }
                    >
                        <NavLink
                            component={ RouterLink }
                            to={ to }
                            label={ label }
                            onClick={ () => close() }
                        />
                    </motion.div>
                )) }
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    );
}