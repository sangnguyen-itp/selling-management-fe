import React from 'react'
import {
    DataGrid,
    GridColDef,
    GridValueFormatterParams
} from '@mui/x-data-grid';

import { Products } from '../../models/product/product.api'
import { Chip, Paper } from '@mui/material';
import { formatCurrency } from '../../helper/currency/convert'

interface ProductTableListProps {
    products: Products
}

const ProductTableList = ({ products }: ProductTableListProps) => {
    return (
        <Paper elevation={10} style={{ height: 700, width: '100%', margin: '20px auto' }}>
            <DataGrid
                rows={products}
                density='comfortable'
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20]}
                checkboxSelection
            />
        </Paper>
    )
}

const columns: GridColDef[] = [
    { field: 'code', headerName: 'Mã hàng', width: 150 },
    { field: 'name', headerName: 'Tên hàng', width: 250 },
    {
        field: 'retail_price',
        headerName: 'Giá bán lẻ',
        width: 200,
        valueFormatter: (params: GridValueFormatterParams) => {
            return formatCurrency(params.value, "vnd")
        }
    },
    { field: 'retail_unit', headerName: 'Đơn vị tính (bán lẻ)', width: 200 },
    {
        field: 'wholesale_price',
        headerName: 'Giá sỉ',
        width: 200,
        valueFormatter: (params: GridValueFormatterParams) => {
            return formatCurrency(params.value, "vnd")
        }
    },
    { field: 'wholesale_unit', headerName: 'Đơn vị tính (giá sỉ)', width: 200 },
    {
        field: 'status',
        headerName: 'Trạng thái',
        width: 170,
        renderCell: (params) => {
            let status = params.value
            let active: boolean = false
            switch (status) {
                case "active": {
                    active = true
                    status = 'Đang hoạt động'
                }
            }

            const render = active ? <Chip label={status} color='primary' /> : <Chip label={status} color='secondary' />
            return render
        }
    },
];

export default ProductTableList


