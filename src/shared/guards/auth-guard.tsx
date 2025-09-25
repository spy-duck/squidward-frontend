import { Navigate, Outlet, useLocation } from 'react-router'
import { ROUTES } from '@/shared/constants/routes';
import { LoadingLayout } from '@/shared/layout/loading.layout';
import { useAuthContext } from '@/shared/context/auth.context';


export function AuthGuard() {
    const location = useLocation()
    
    const { isAuthenticated, isInitialized } = useAuthContext()
    
    if (!isInitialized) {
        return <LoadingLayout />
    }
    
    if (!isAuthenticated) {
        if (location.pathname.includes(ROUTES.AUTH.ROOT)) {
            return <Outlet />
        }
        return <Navigate replace to={ROUTES.AUTH.LOGIN} />
    }
    
    if (isAuthenticated) {
        if (location.pathname.includes(ROUTES.DASHBOARD.ROOT)) {
            return <Outlet />
        }
        return <Navigate replace to={ROUTES.DASHBOARD.ROOT} />
    }
    
    return <Outlet />
}