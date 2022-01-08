import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Products } from '../../models/product/product.api'

interface ProductState {
    isLoading: boolean
    isEdit: boolean
    isAdd: boolean
    isDelete: boolean
    data: Products
    selectedData: Products
}

const initialState: ProductState = {
    isLoading: false,
    isEdit: false,
    isAdd: false,
    isDelete: false,
    data: [],
    selectedData: []
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
        },
        editProductInprogress: (state) => {
            state.isEdit = true
        },
        editProductSuccess: (state) => {
            state.isEdit = false
        },
        editProductFailed: (state) => {
            state.isEdit = false
        },
        setSelectedProducts: (state, { payload }: PayloadAction<Products>) => {
            state.selectedData = payload
        }
    }
})

export const { getProductsSuccess, setIsLoading, getProductsFailed,
    editProductInprogress, editProductSuccess, editProductFailed, setSelectedProducts } = productSlice.actions

const productReducer = productSlice.reducer;
export default productReducer;