import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import FilterByCategory from './filters/FilterByCategory';
import FilterByPrice from './filters/FilterByPrice';
import FilterByService from './filters/FilterByService';

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func
};

function ProductFilters({ filters, onChange }) {

    const handelCategoryChange = (categoryid) => {
        if (!onChange) return

        const newFilter = {
            ...filters,
            'category.id': categoryid
        }
        onChange(newFilter)
    }

    const handelPriceChange = values => {
        if (onChange) onChange(values)
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{}}>Danh sách sản phẩm</Typography>
            <FilterByCategory onChange={handelCategoryChange} />
            <FilterByPrice onChange={handelPriceChange} />
            <FilterByService filters={filters} onChange={handelPriceChange} />
        </Box>
    );
}

export default ProductFilters;