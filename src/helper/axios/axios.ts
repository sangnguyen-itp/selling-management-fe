import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { getUserAuth } from './../../storage/auth/auth';

export const newAxiosRequestConfig = (isToken: boolean) => {
    if (isToken) {
        const authenticatedUser = getUserAuth()
        if (authenticatedUser) {
            return {
                headers: {
                    'Authorization': 'Bearer ' + authenticatedUser.access_token
                }
            } as AxiosRequestConfig
        }
    }

    return {} as AxiosRequestConfig
}

