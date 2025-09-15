import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import { AppLayout } from '@/shared/layout/app.layout';
import { lazy } from 'react';
import { ROUTES } from '@/shared/constants/routes';

const LoginPage = lazy(() => import('@/pages/login'));
const NodesPage = lazy(() => import('@/pages/nodes'));
const UsersPage = lazy(() => import('@/pages/users'));
const SquidConfigPage = lazy(() => import('@/pages/squid-config'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<AppLayout />} path={'/'}>
                <Route element={<LoginPage />} path={ROUTES.LOGIN} />
                <Route element={<LoginPage />} path={ROUTES.LOGIN} />
                <Route element={<NodesPage />} path={ROUTES.DASHBOARD.NODES.BASE} />
                <Route element={<UsersPage />} path={ROUTES.DASHBOARD.USERS.BASE} />
                <Route element={<SquidConfigPage />} path={ROUTES.DASHBOARD.SQUID.CONFIG} />
            </Route>
        </Route>
    )
);


export function Router() {
    return <RouterProvider router={router} />
}