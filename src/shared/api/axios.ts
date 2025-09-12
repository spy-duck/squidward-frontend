import axios from 'axios';
import { consola } from "consola/browser";


let authorizationToken = '';
export const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    config.headers.set('Authorization', `Bearer ${ authorizationToken }`)
    return config
});

apiClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response) {
            const responseStatus = error.response.status
            if (responseStatus === 403 || responseStatus === 401) {
                try {
                    // TOTO: logout
                } catch (error) {
                    consola.log('error', error)
                }
            }
        }
        return Promise.reject(error)
    }
)

export const setAuthorizationToken = (token: string) => {
    authorizationToken = token
}