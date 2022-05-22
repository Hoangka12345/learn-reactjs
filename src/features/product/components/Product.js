import React from 'react';
import PropTypes from 'prop-types';
import { Box, Skeleton, Typography } from '@mui/material';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants'

Product.propTypes = {
    product: PropTypes.object
};

function Product({ product }) {
    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : THUMBNAIL_PLACEHOLDER
    return (
        <Box padding={1}>
            <Box sx={{ padding: 1, minHeight: '210px' }}>
                <img
                    src={thumbnailUrl}
                    alt={product.name}
                    width="100%"
                />
            </Box>
            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2">
                <Box component="span" sx={{ fontSize: '16px', fontWeight: 'bold', mr: 1 }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.salePrice)}
                </Box>
                {product.promotionPercent > 0
                    ? <Box component="span">- {product.promotionPercent}%</Box>
                    : ""
                }
            </Typography>
        </Box>
    );
}

export default Product;