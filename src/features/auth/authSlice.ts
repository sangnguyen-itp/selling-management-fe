import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthResponse {
    access_token: string
    user_id: string
    organization_id: string
    role: string
    login_time: string
    is_system: boolean
}

interface AuthState {
    isLogging: boolean
    isLoggedIn: boolean
    error: string
}

export interface IsAuth {
    isLoggedIn: boolean
}

const initialState: AuthState = {
    isLogging: false,
    isLoggedIn: false,
    error: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLogging: (state) => {
            state.isLogging = true
            state.isLoggedIn = false
            state.error = ''
        },
        setLoginSuccess: (state) => {
            state.isLogging = false
            state.isLoggedIn = true
            state.error = ''
        },
        setLoginFailed: (state, { payload }: PayloadAction<string>) => {
            state.isLogging = false
            state.error = payload
            state.isLoggedIn = false
        },
        setLogout: (state) => {
            state.isLogging = false
            state.error = ''
            state.isLoggedIn = false
        },
        setUnAuthenticated: (state) => {
            state.isLogging = false
            state.error = ''
            state.isLoggedIn = false
        },
        setUnAuthorized: (state, { payload }: PayloadAction<string>) => {
            state.isLogging = false
            state.error = payload
            state.isLoggedIn = false
        }
    }
})

export const { setIsLogging, setLoginSuccess, setLoginFailed, setLogout, setUnAuthenticated, setUnAuthorized } = authSlice.actions

const authReducer = authSlice.reducer;
export default authReducer;