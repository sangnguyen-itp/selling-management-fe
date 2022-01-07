import { Alert, Avatar, Button, Grid, Paper, TextField } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import React, { FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { Login } from '../models/auth/Login'
import { Response } from '../models/common/Response'
import loginAPI from '../api/auth/login'

import { useAppDispatch, useAppSelector } from '../hooks'
import { setIsLogging, setLoginSuccess, setLoginFailed, AuthResponse, setUnAuthenticated } from '../features/auth/authSlice'
import { saveUserAuth } from '../storage/auth/auth'

const LoginPage = () => {
    // navigate
    const navigate = useNavigate()

    // dispatch
    const dispatch = useAppDispatch()

    // states
    const [{ username, password }, setCredentials] = useState<Login>({
        username: '',
        password: ''
    })

    // selector
    const { error, isLoggedIn } = useAppSelector((state) => { return state.authReducer })

    // common
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()
        dispatch(setIsLogging())

        try {
            const res = await loginAPI({ username, password })
            let { data } = res as Response

            // save user auth
            saveUserAuth(data)

            dispatch(setLoginSuccess())

            navigate('/products')
        } catch (error) {
            const err = error as Response
            dispatch(setLoginFailed(err.msg))
        }
    }

    return (
        <Paper elevation={10} style={{ padding: 20, width: 300, margin: "20px auto", textAlign: 'center' }}>
            <Grid style={{ margin: "20px auto" }}>
                <Avatar style={{ margin: "auto", background: "blue" }}><LockOutlined /></Avatar>
                <h2>Đăng nhập hệ thống</h2>
            </Grid>
            <Grid>
                <form onSubmit={handleLogin}>
                    <TextField style={{ margin: "20px auto" }} label={"Tên đăng nhập"} fullWidth required
                        value={username}
                        onChange={(e) => setCredentials({
                            username: e.target.value,
                            password
                        })}
                    />
                    <TextField style={{ margin: "20px auto" }} type={"password"} label={"Mật khẩu"} fullWidth required
                        value={password}
                        onChange={(e) => setCredentials({
                            username,
                            password: e.target.value
                        })}
                    />
                    <Button
                        variant="contained"
                        style={{ margin: "20px auto" }}
                        type="submit"
                        color="primary"
                        fullWidth
                    >Đăng nhập</Button>
                    {error !== '' ? <Alert color='error' >{error}</Alert> : null}
                </form>
            </Grid>
        </Paper>
    )
}

export default LoginPage
