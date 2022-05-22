import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Typography } from '@mui/material';

FilterByPrice.propTypes = {
    onChange: PropTypes.func
};

function FilterByPrice({ onChange }) {
    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    })

    const handelChange = e => {
        const { name, value } = e.target
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }))
    }

    const handelSubmit = () => {
        if (onChange) onChange(values)
    }

    return (
        <Box sx={{ borderTop: '1px solid #999' }}>
            <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>Giá</Typography>
            <Box sx={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', mb: 1 }}>
                <TextField size="small" name="salePrice_gte" value={values.salePrice_gte} onChange={handelChange} />
                <Box component="span" sx={{ margin: '0 5px' }}>-</Box>
                <TextField size="small" name="salePrice_lte" value={values.salePrice_lte} onChange={handelChange} />
            </Box>
            <Box size="small" sx={{ mb: 2 }}>
                <Button variant="outlined" onClick={handelSubmit}>Áp dụng</Button>
            </Box>
        </Box >
    );
}

export default FilterByPrice;