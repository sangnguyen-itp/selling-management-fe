import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Products } from '../../models/product/product.api'

interface ProductState {
    isLoading: boolean
    data: Products
}

const initialState: ProductState = {
    isLoading: false,
    data: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setIsLoading: (state) => {
            state.isLoading = true
        },
        getProductsSuccess: (state, { payload }: PayloadAction<Products>) => {
            state.isLoading = false
            state.data = payload
        },
        getProductsFailed: (state) => {
            state.isLoading = false
        }
    }
})

export const { getProductsSuccess, setIsLoading, getProductsFailed } = productSlice.actions

const productReducer = productSlice.reducer;
export default productReducer;