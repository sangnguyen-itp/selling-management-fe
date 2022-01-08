import React, { useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProductPage from './pages/ProductPage';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import { getUserAuth } from './storage/auth/auth';
import { useAppDispatch } from './app/store';
import { useAppSelector } from './hooks';
import { setLoginFailed, setLoginSuccess, setUnAuthenticated } from './features/auth/authSlice';
import RequireAuth from './ProtectedRoutes';
import HomePage from './pages/HomePage';

const App = () => {
    //dispatch
    const dispatch = useAppDispatch()

    // selector
    const isLoggedIn = useAppSelector((state) => { return state.authReducer.isLoggedIn })

    useEffect(() => {
        const isAuth = getUserAuth() !== undefined
        if (isAuth) {
            dispatch(setLoginSuccess())
        } else {
            dispatch(setUnAuthenticated())
        }
    }, [])

    return (
        <Box>
            <Router>
                {isLoggedIn && <Navbar />}
                <Routes>
                    {
                        !isLoggedIn ?
                            <Route path='/login' element={<LoginPage />} /> :
                            <Route path='/' element={<RequireAuth isLoggedIn={isLoggedIn} children={<ProductPage />} />} />
                    }
                    <Route path='/products' element={<RequireAuth isLoggedIn={isLoggedIn} children={<ProductPage />} />} />
                </Routes>
            </Router>
        </Box>
    );
}

export default App;
