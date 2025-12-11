import React, { type ReactNode, useEffect, useState } from 'react';
import { useAuthCheck } from '@/shared/api/hooks/auth';
import { useSessionToken, useSetSession } from '@/entities/auth/session-store';
import { queryClient, setAuthorizationToken } from '@/shared/api';
import { credentialsChangedEvents, logoutEvents } from '@/shared/emmiters';
import { notifications } from '@mantine/notifications';
import { ROUTES } from '@/shared/constants/routes';

type TAuthContext = {
    isAuthenticated: boolean;
    isInitialized: boolean;
    isChangePasswordRequired: boolean;
    backendVersion: string | null | undefined;
    login(accessToken: string): Promise<void>;
    logout(): void;
};


const AuthContext = React.createContext<TAuthContext>({
    isAuthenticated: false,
    isInitialized: false,
    isChangePasswordRequired: false,
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
    const [ backendVersion, setBackendVersion ] = useState<string | null | undefined>(null);
    const [ isChangePasswordRequired, setIsChangePasswordRequired ] = useState(false);
    const sessionToken = useSessionToken();
    const setSessionToken = useSetSession();
    
    useEffect(() => {
        setAuthorizationToken(sessionToken || '');
        setIsAuthenticated(!!sessionToken);
    }, [ sessionToken ]);
    
    const { authCheck, isAuthFetched, refetchCheckAuth } = useAuthCheck();
    
    useEffect(() => {
        setIsInitialized(isAuthFetched);
    }, [ isAuthFetched ]);
    
    useEffect(() => {
        setIsAuthenticated(authCheck?.success || false);
        if (authCheck?.success) {
            setIsChangePasswordRequired(!!authCheck?.isChangePasswordRequired);
            setBackendVersion(authCheck.version);
        }
    }, [ authCheck?.success ]);
 
    useEffect(() => {
        return logoutEvents.subscribe(() => {
            if (!isAuthenticated) {
                return;
            }
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
    }, [ isAuthenticated ]);
    
    useEffect(() => {
        return credentialsChangedEvents.subscribe(async () => {
            setIsChangePasswordRequired(false);
            notifications.show({
                title: 'Credentials changed',
                message: 'Please log in again',
                color: 'green',
                radius: 'md',
            });
            logout();
        });
    }, []);
    
    async function login(accessToken: string) {
        setSessionToken(accessToken);
        setIsAuthenticated(true);
        setTimeout(async () => {
            await refetchCheckAuth();
        }, 300);
    }
    
    function logout() {
        setSessionToken(null);
        setIsAuthenticated(false);
        queryClient.clear();
    }
    
    return (
        <AuthContext value={ {
            isAuthenticated,
            isInitialized,
            isChangePasswordRequired,
            login,
            logout,
            backendVersion,
        } }>
            { children }
        </AuthContext>
    );
}
