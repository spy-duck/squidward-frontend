import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Button, Group, NavLink } from '@mantine/core';
import { Outlet, NavLink as RouterLink } from 'react-router';
import { ROUTES } from '@/shared/constants/routes';
import { motion } from 'framer-motion'
import { IconLogout } from '@tabler/icons-react';
import { useAuthContext } from '@/shared/context/auth.context';

export function AppLayout() {
    const [ opened, { toggle, close } ] = useDisclosure();
    const { logout } = useAuthContext();
    
    const navLinks = [
        {
            label: 'Users',
            to: ROUTES.DASHBOARD.USERS.BASE,
        },
        {
            label: 'Nodes',
            to: ROUTES.DASHBOARD.NODES.BASE,
        },
        {
            label: 'Squid configs',
            to: ROUTES.DASHBOARD.SQUID.CONFIGS,
        },
    ]
    
    return (
        <AppShell
            header={ { height: 60 } }
            navbar={ { width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } } }
            padding='md'
        >
            <AppShell.Header>
                <Group h='100%' px='md'>
                    <Burger opened={ opened } onClick={ toggle } hiddenFrom='sm' size='sm'/>
                    <div style={ { flex: 1 } }>
                        Squidward Dashboard
                    </div>
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