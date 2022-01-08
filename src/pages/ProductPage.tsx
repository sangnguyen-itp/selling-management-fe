import React, { useEffect, useState } from 'react'
import listProductsAPI from '../api/product/listProducts'
import { useAppDispatch } from '../app/store'
import ProductTableList from '../components/Product/ProductTableList'
import { Products } from '../models/product/product.api'
import { Response } from '../models/common/Response'
import { useAppSelector } from '../hooks'
import { getProductsFailed, getProductsSuccess, setIsLoading } from '../features/product/productSlice'
import ProductSearch from '../components/Product/ProductSearch'
import { Box } from '@mui/material'
import ProductCard from '../components/Product/ProductCard'
import ProductToolbar from '../components/Product/ProductToolbar'
import ProductDetail from '../components/Product/ProductDetail'
import { HandleError } from '../handleError'

const ProductPage = () => {

    const { data, selectedData } = useAppSelector((state) => { return state.productReducer })

    // dispatch
    const dispatch = useAppDispatch()

    // effect
    useEffect(() => {
        dispatch(setIsLoading())
        const productList = async () => {
            try {
                const res: any = await listProductsAPI({})
                let { data } = res as Response
                dispatch(getProductsSuccess(data))
            } catch (error) {
                const err = error as Response
                HandleError(err)
                dispatch(getProductsFailed())
            }
        }

        productList()
    }, [dispatch])

    return (
        <Box display='column' mt={2} ml={2} mr={2} position='inherit'>
            <ProductSearch />
            <ProductToolbar />
            {data.length === 1 && <ProductCard product={data[0]} />}
            {selectedData.length === 1 && <ProductDetail product={selectedData[0]} />}
            <ProductTableList products={data} />
        </Box>
    )
}

export default ProductPage
