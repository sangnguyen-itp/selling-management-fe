import { AuthResponse } from './../../features/auth/authSlice'

export const saveUserAuth = (response: AuthResponse) => {
    localStorage.setItem('authenticate_user', JSON.stringify(response))
}

export const getUserAuth = () => {
    const userAuth = localStorage.getItem('authenticate_user')
    if (userAuth === undefined) {
        return undefined
    } else {
        return JSON.parse(userAuth as string) as AuthResponse
    }
}

export const removeUserAuth = () => {
    localStorage.removeItem('authenticate_user')
}