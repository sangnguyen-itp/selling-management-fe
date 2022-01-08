import { Alert, Box, Button, Grid, TextField } from '@mui/material'
import React, { FormEvent, useState } from 'react'
import { Product } from '../../models/product/product.api'
import { Response } from '../../models/common/Response';

import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useAppDispatch } from '../../app/store';
import { editProductFailed, editProductInprogress, editProductSuccess, getProductsSuccess } from '../../features/product/productSlice';
import putProductAPI from '../../api/product/putProduct';
import { setUnAuthenticated } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

import { HandleError } from '../../handleError';
import { removeUserAuth } from '../../storage/auth/auth'

interface ProductDetailProps {
    product: Product
}

const currencies = [
    {
        value: 'vnd',
        label: 'VND',
    },
];

const ProductDetail = ({ product }: ProductDetailProps) => {

    // navigate
    const navigate = useNavigate()

    // dispatch
    const dispatch = useAppDispatch()

    // states
    const [editProduct, setEditProduct] = useState(product)

    const [err, setErr] = useState('')

    // commons
    const handleAddEdit = async () => {
        console.log(editProduct)
        dispatch(editProductInprogress())

        await putProductAPI({ ...editProduct }, true)
            .then((response) => {
                dispatch(editProductSuccess())
                window.location.reload()
            })
            .catch((error) => {
                const err = error as Response
                HandleError(err)
                dispatch(editProductFailed())
            })
    }

    return (
        <Box display='grid'>
            <Box style={{ margin: '10px auto' }}
                component='form'
                noValidate
                autoComplete="off"
                sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    borderRadius: 1,
                    p: 2,
                    minWidth: 200,
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}>
                <Box style={{ paddingLeft: 10 }}>
                    <h2>Chi tiết sản phẩm</h2>
                </Box>
                {err && <Alert color='error'>{err}</Alert>}
                <Box style={{ marginBottom: 10 }}>
                    <Button variant='outlined' type='button' color='primary' disabled={err ? true : false} style={{ marginLeft: 12 }}
                        onClick={handleAddEdit}
                    >
                        <SaveAsIcon style={{ marginRight: '4px' }} titleAccess='Lưu' /> Lưu
                    </Button>
                </Box>

                <Grid justifyItems='center'>
                    {product && <TextField title='ID' label='ID' disabled type='text' value={editProduct?.id} />}
                    <TextField title='Mã sản phẩm' label='Mã sản phẩm' disabled type='text' value={editProduct?.code} />
                    <TextField title='Tên sản phẩm' label='Tên sản phẩm' type='text' required value={editProduct?.name}
                        error={false}
                        onChange={
                            (e) => setEditProduct({
                                ...editProduct,
                                name: e.target.value
                            })}
                    />
                    <TextField title='Giá bán lẻ' label='Giá bán lẻ' type='text' required value={editProduct?.retail_price}
                        onChange={
                            (e) => setEditProduct({
                                ...editProduct,
                                retail_price: +e.target.value
                            })}
                    />
                    <TextField title='Đơn vị tính lẻ' label='Đơn vị tính lẻ' type='text' required value={editProduct?.retail_unit}
                        onChange={
                            (e) => setEditProduct({
                                ...editProduct,
                                retail_unit: e.target.value
                            })}
                    />
                    <TextField title='Giá bán sỉ' label='Giá bán sỉ' type='text' required value={editProduct?.wholesale_price}
                        onChange={
                            (e) => setEditProduct({
                                ...editProduct,
                                wholesale_price: +e.target.value
                            })}
                    />
                    <TextField title='Đơn vị tính sỉ' label='Đơn vị tính sỉ' type='text' required value={editProduct?.wholesale_unit}
                        onChange={
                            (e) => setEditProduct({
                                ...editProduct,
                                wholesale_unit: e.target.value
                            })}
                    />
                    <TextField
                        title='Loại tiền tệ'
                        label='Loại tiền tệ'
                        select required
                        value={editProduct?.currency}
                        onChange={
                            (e) => setEditProduct({
                                ...editProduct,
                                currency: e.target.value
                            })}
                    >
                        {currencies.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </Grid>
            </Box>
        </Box>

    )
}

export default ProductDetail
