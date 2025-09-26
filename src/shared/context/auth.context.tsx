import React, { type ReactNode, useEffect, useState } from 'react';
import { useAuthCheck } from '@/shared/api/hooks/auth';
import { useSessionToken, useSetSession } from '@/entities/auth/session-store';
import { setAuthorizationToken } from '@/shared/api';
import { logoutEvents } from '@/shared/emmiters';
import { notifications } from '@mantine/notifications';
import { ROUTES } from '@/shared/constants/routes';

type TAuthContext = {
    isAuthenticated: boolean;
    isInitialized: boolean;
    login(accessToken: string): void;
    logout(): void;
};


const AuthContext = React.createContext<TAuthContext>({
    isAuthenticated: false,
    isInitialized: false,
} as TAuthContext);

export function useAuthContext() {
    return React.useContext(AuthContext);
}

type TAuthProps = {
    children?: ReactNode
};
export const AuthProvider = ({ children }: TAuthProps): ReactNode => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ isInitialized, setIsInitialized ] = useState(false);
    const sessionToken = useSessionToken();
    const setSessionToken = useSetSession();
    
    useEffect(() => {
        setAuthorizationToken(sessionToken || '');
        setIsAuthenticated(!!sessionToken);
    }, [ sessionToken ]);
    
    const { authCheck, isAuthFetched } = useAuthCheck();
    
    useEffect(() => {
        setIsInitialized(isAuthFetched);
    }, [ isAuthFetched ]);
    
    useEffect(() => {
        setIsAuthenticated(authCheck?.success || false);
    }, [ authCheck?.success ]);
    
    function login(accessToken: string) {
        setSessionToken(accessToken);
        setIsAuthenticated(true);
    }
    
    useEffect(() => {
        return logoutEvents.subscribe(() => {
            logout();
            if (!window.location.pathname.startsWith(ROUTES.AUTH.ROOT)) {
                notifications.show({
                    title: 'Session expired',
                    message: 'You need to log in again',
                    color: 'orange',
                    radius: 'md',
                });
            }
        });
    }, []);
    
    function logout() {
        setSessionToken(null);
        setIsAuthenticated(false);
    }
    
    return (
        <AuthContext value={ {
            isAuthenticated,
            isInitialized,
            login,
            logout,
        } }>
            { children }
        </AuthContext>
    );
}
