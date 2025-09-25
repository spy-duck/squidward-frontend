import axios from 'axios';
import { CLIENT_TYPE_BROWSER, CLIENT_TYPE_HEADER } from '@squidward/contracts/constants';

let authorizationToken = '';
export const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        [CLIENT_TYPE_HEADER]: CLIENT_TYPE_BROWSER,
    },
    validateStatus: (status) => String(status).startsWith('2') || status === 401,
});

apiClient.interceptors.request.use((config) => {
    config.headers.set('Authorization', `Bearer ${ authorizationToken }`)
    return config
});

export const setAuthorizationToken = (token: string) => {
    authorizationToken = token
}