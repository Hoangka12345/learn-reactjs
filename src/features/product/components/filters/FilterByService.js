import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, FormControlLabel, List, ListItem, Typography } from '@mui/material';

FilterByService.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func
};

function FilterByService({ filters, onChange }) {

    const handelChange = e => {
        if (!onChange) return

        const { name, checked } = e.target
        onChange({ [name]: checked })
    }

    return (
        <Box sx={{ borderTop: '1px solid #999' }}>
            <Typography variant="h6" sx={{ mt: 2 }}>Dịch vụ</Typography>
            <List >
                {[
                    { value: 'isPromotion', label: 'Có khuyến mãi' },
                    { value: 'isFreeShip', label: 'Miễn phí vận chuyển' }
                ].map(service => {
                    return (
                        <ListItem
                            key={service.value}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox checked={Boolean(filters[service.value])} onChange={handelChange} name={service.value} />
                                }
                                label={service.label}
                            />
                        </ListItem>
                    )
                })}
            </List>
        </Box >
    );
}

export default FilterByService;