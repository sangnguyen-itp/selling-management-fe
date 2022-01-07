import { getUserAuth } from './../storage/auth/auth';
const getAdminBaseURL = () => {
    return process.env.REACT_APP_BASE_URL + '/v1/system'
}

const getClientBaseURL = () => {
    return process.env.REACT_APP_BASE_URL + '/v1/client'
}

export const getBaseURL = () => {
    const userAuth = getUserAuth()
    if (userAuth) {
        return userAuth.is_system ? getAdminBaseURL() : getClientBaseURL()
    }
}