import * as React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { setIsLoading, getProductsSuccess, getProductsFailed } from '../../features/product/productSlice';
import listProductsAPI from '../../api/product/listProducts';
import { Response } from '../../models/common/Response';
import { HandleError } from '../../handleError';

export default function ProductSearch() {
    // state
    const [search, setSearch] = React.useState('')

    // useDispatch
    const dispatch = useAppDispatch()

    // commons
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(setIsLoading())

        try {
            const res = await listProductsAPI({ keyword: search })
            let { data } = res as Response
            if (data === null) {
                data = []
            }
            dispatch(getProductsSuccess(data))
        } catch (error) {
            const err = error as Response
            HandleError(err)
            dispatch(getProductsFailed())
        }
    }

    return (
        <Grid container direction='row' justifyContent='center'>
            <TextField
                style={{ marginRight: 10 }}
                label='Tra cứu sản phẩm'
                value={search}
                onChange={(e) => setSearch(e.target.value)} onKeyUp={handleSearch} />
        </Grid>
    );
}
