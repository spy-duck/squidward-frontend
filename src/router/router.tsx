import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router';
import { AppLayout } from '@/shared/layout/app.layout';
import { lazy } from 'react';
import { ROUTES } from '@/shared/constants/routes';

const ErrorPageComponent = lazy(() => import('@/pages/errors/5xx-error'));
const NotFoundPageComponent = lazy(() => import('@/pages/errors/4xx-error'));
const LoginPage = lazy(() => import('@/pages/login'));
const NodesPage = lazy(() => import('@/pages/nodes'));
const UsersPage = lazy(() => import('@/pages/users'));
const SquidConfigPage = lazy(() => import('@/pages/squid-config'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<ErrorPageComponent />}>
            <Route element={<Navigate replace to={ROUTES.DASHBOARD.ROOT} />} path="/" />
            <Route>
                <Route element={<Navigate replace to={ROUTES.AUTH.LOGIN} />} path={ROUTES.AUTH.ROOT} />
                <Route element={<LoginPage />} path={ROUTES.AUTH.LOGIN} />
            </Route>
            
            <Route element={<AppLayout />} path={ROUTES.DASHBOARD.ROOT}>
                <Route element={<Navigate replace to={ROUTES.DASHBOARD.USERS.BASE} />} path={ROUTES.DASHBOARD.ROOT} />
                <Route element={<NodesPage />} path={ROUTES.DASHBOARD.NODES.BASE} />
                <Route element={<UsersPage />} path={ROUTES.DASHBOARD.USERS.BASE} />
                <Route element={<SquidConfigPage />} path={ROUTES.DASHBOARD.SQUID.CONFIGS} />
            </Route>
            
            <Route element={<NotFoundPageComponent />} path="*" />
        </Route>
    )
);


export function Router() {
    return <RouterProvider router={router} />
}