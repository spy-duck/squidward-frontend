import axios, { isAxiosError } from 'axios';
import { CLIENT_TYPE_BROWSER, CLIENT_TYPE_HEADER } from '@squidward/contracts/constants';
import { logoutEvents } from '@/shared/emmiters';
import consola from 'consola/browser';

let authorizationToken = '';
export const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        [CLIENT_TYPE_HEADER]: CLIENT_TYPE_BROWSER,
    },
    // validateStatus: (status) => String(status).startsWith('2') || status === 401,
});

apiClient.interceptors.request.use((config) => {
    config.headers.set('Authorization', `Bearer ${ authorizationToken }`)
    return config
});

apiClient.interceptors.response.use(
    (config) => config,
    (error) => {
        if (isAxiosError(error) && error.response && [401, 403].includes(error.response.status)) {
            try {
                logoutEvents.emit()
            } catch (error) {
                consola.log('error', error)
            }
        }
        return Promise.reject(error);
    });

export const setAuthorizationToken = (token: string) => {
    authorizationToken = token
}