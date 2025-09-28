import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router';
import { AppLayout } from '@/shared/layout/app.layout';
import { lazy } from 'react';
import { ROUTES } from '@/shared/constants/routes';
import { AuthGuard } from '@/shared/guards/auth-guard';
import { AuthLayout } from '@/shared/layout/auth.layout';

const ErrorPageComponent = lazy(() => import('@/pages/errors/5xx-error'));
const NotFoundPageComponent = lazy(() => import('@/pages/errors/4xx-error'));
const LoginPage = lazy(() => import('@/pages/login'));
const NodesPage = lazy(() => import('@/pages/nodes'));
const UsersPage = lazy(() => import('@/pages/users'));
const SquidConfigPage = lazy(() => import('@/pages/squid-config'));
const ApiTokensPage = lazy(() => import('@/pages/api-tokens'));
const HostsPage = lazy(() => import('@/pages/hosts'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={ <ErrorPageComponent/> }>
            <Route element={ <AuthGuard/> }>
                <Route element={ <Navigate replace to={ ROUTES.DASHBOARD.ROOT }/> } path='/'/>
                
                <Route element={ <AuthLayout/> }>
                    <Route element={ <Navigate replace to={ ROUTES.AUTH.LOGIN }/> } path={ ROUTES.AUTH.ROOT }/>
                    <Route element={ <LoginPage/> } path={ ROUTES.AUTH.LOGIN }/>
                </Route>
                
                <Route element={ <AppLayout/> } path={ ROUTES.DASHBOARD.ROOT }>
                    <Route element={ <Navigate replace to={ ROUTES.DASHBOARD.USERS.ROOT }/> }
                           path={ ROUTES.DASHBOARD.ROOT }/>
                    <Route element={ <NodesPage/> } path={ ROUTES.DASHBOARD.NODES.ROOT }/>
                    <Route element={ <UsersPage/> } path={ ROUTES.DASHBOARD.USERS.ROOT }/>
                    <Route element={ <SquidConfigPage/> } path={ ROUTES.DASHBOARD.SQUID.CONFIGS }/>
                    <Route element={ <ApiTokensPage/> } path={ ROUTES.DASHBOARD.API_TOKENS.ROOT }/>
                    <Route element={ <HostsPage/> } path={ ROUTES.DASHBOARD.HOSTS.ROOT }/>
                </Route>
                
                <Route element={ <NotFoundPageComponent/> } path='*'/>
            </Route>
        </Route>,
    ),
);


export function Router() {
    return <RouterProvider router={ router }/>
}