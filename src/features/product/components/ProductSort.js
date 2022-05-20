import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@mui/material';

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func
};

function ProductSort({ currentSort, onChange }) {
    const handelChangeSort = (e, newValue) => {
        if (onChange) onChange(newValue)
    }

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
                value={currentSort}
                onChange={handelChangeSort}
                aria-label="basic tabs example"
                textColor='primary'
                indicatorColor='primary'
            >
                <Tab label="Gia thap toi cao" value="salePrice:ASC" ></Tab>
                <Tab label="Gia cao toi thap" value="salePrice:DESC" ></Tab>
            </Tabs>
        </Box>
    );
}

export default ProductSort;