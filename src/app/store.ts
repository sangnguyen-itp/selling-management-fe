import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from 'react-redux'

import authReducer from "../features/auth/authSlice"
import productReducer from "../features/product/productSlice"

const store = configureStore({
    reducer: {
        authReducer,
        productReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch()

export default store