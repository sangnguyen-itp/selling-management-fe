import { Button, Stack } from '@mui/material'
import React from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ProductImport from './ProductImport';
import { useAppSelector } from '../../hooks';
import { getUserAuth } from '../../storage/auth/auth';

const ProductToolbar = () => {

    const userAuth = getUserAuth()

    return (
        <Stack direction='row' justifyContent='flex-end' mt={4}>
            <Button variant='outlined' color='primary' style={{ marginLeft: 12 }} ><AddCircleOutlineOutlinedIcon titleAccess='Thêm' /></Button>
            {(userAuth && !userAuth.is_system) && <ProductImport />}
        </Stack>
    )
}

export default ProductToolbar
