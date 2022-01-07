import React, { useEffect, useState } from 'react'
import listProductsAPI from '../api/product/listProducts'
import { useAppDispatch } from '../app/store'
import ProductTableList from '../components/Product/ProductTableList'
import { Products } from '../models/product/product.api'
import { Response } from '../models/common/Response'
import { useAppSelector } from '../hooks'
import { removeUserAuth } from '../storage/auth/auth'
import { useNavigate } from 'react-router-dom'
import { getProductsSuccess } from '../features/product/productSlice'
import ProductSearch from '../components/Product/ProductSearch'
import { Box } from '@mui/material'
import ProductCard from '../components/Product/ProductCard'

const ProductPage = () => {
    // navigate
    const navigate = useNavigate()

    const products = useAppSelector((state) => { return state.productReducer.data })

    // dispatch
    const dispatch = useAppDispatch()

    // effect
    useEffect(() => {
        const productList = async () => {
            try {
                const res: any = await listProductsAPI({})
                let { data } = res as Response
                dispatch(getProductsSuccess(data))
            } catch (error) {
                const err = error as Response
                if (err.code === 401) {
                    removeUserAuth()
                    navigate('/login')
                }
            }
        }

        productList()
    }, [dispatch])

    return (
        <Box display='column' mt={2} ml={2} mr={2} position='inherit'>
            <ProductSearch />
            {products.length === 1 && <ProductCard product={products[0]} />}
            <ProductTableList products={products} />
        </Box>
    )
}

export default ProductPage
