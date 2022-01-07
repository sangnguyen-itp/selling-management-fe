import { Box } from '@mui/material'
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import React from 'react'
import { Product } from '../../models/product/product.api'
import { formatCurrency } from '../../helper/currency/convert'

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Box
            style={{ margin: '10px auto' }}
            sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 1,
                p: 2,
                minWidth: 200
            }}
        >
            <Box sx={{ color: 'text.secondary', fontWeight: 'medium' }}>{product.name}</Box>
            <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
                {formatCurrency(product.retail_price, product.currency)} / {product.retail_unit}
            </Box>
            <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
                {formatCurrency(product.wholesale_price, product.currency)} / {product.wholesale_unit}
            </Box>
            <Box
                component={LocalAtmOutlinedIcon}
                sx={{ color: 'success.dark', fontSize: 16, verticalAlign: 'sub' }}
            />
            <Box
                sx={{
                    color: 'success.dark',
                    display: 'inline',
                    fontWeight: 'medium',
                    mx: 0.5,
                }}
            >
                {formatCurrency(product.retail_price, product.currency)} - {formatCurrency(product.wholesale_price, product.currency)}
            </Box>
            <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}>
                ({product.retail_unit}/ {product.wholesale_unit})
            </Box>
        </Box>
    )
}

export default ProductCard
