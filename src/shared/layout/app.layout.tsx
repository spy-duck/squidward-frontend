import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { Outlet, NavLink as RouterLink } from 'react-router';
import { ROUTES } from '@/shared/constants/routes';

export function AppLayout() {
    const [ opened, { toggle } ] = useDisclosure();
    
    return (
        <AppShell
            header={ { height: 60 } }
            navbar={ { width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } } }
            padding='md'
        >
            <AppShell.Header>
                <Group h='100%' px='md'>
                    <Burger opened={ opened } onClick={ toggle } hiddenFrom='sm' size='sm'/>
                    Squidward Dashboard
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p='md'>
                <NavLink
                    component={ RouterLink }
                    to={ ROUTES.LOGIN }
                    label='Login'
                />
                <NavLink
                    component={ RouterLink }
                    to={ ROUTES.DASHBOARD.NODES.BASE }
                    label='Nodes'
                />
                <NavLink
                    component={ RouterLink }
                    to={ ROUTES.DASHBOARD.USERS.BASE }
                    label='Users'
                />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    );
}