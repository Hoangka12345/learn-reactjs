import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, List } from '@mui/material';

const FILTER_LIST = [
    {
        id: 1,
        getLabel: () => 'Giao Hàng miễn phí',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemoved: false,
        onRemove: () => { },
        onToggle: (filters) => {
            const newFilters = { ...filters }
            if (newFilters.isFreeShip) {
                delete newFilters.isFreeShip
            }
            else {
                newFilters.isFreeShip = true
            }

            return newFilters
        },
    },
    {
        id: 2,
        getLabel: () => 'Có khuyến mãi',
        isActive: () => true,
        isVisible: (filters) => filters.isPromotion,
        isRemoved: true,
        onRemove: (filters) => {
            const newFilters = { ...filters }
            delete newFilters.isPromotion
            return newFilters
        },
        onToggle: () => { },
    },
    {
        id: 3,
        getLabel: (filters) => ` từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
        isActive: () => true,
        isVisible: (filters) =>
            Object.keys(filters).includes('salePrice_gte') && Object.keys(filters).includes('salePrice_lte'),
        isRemoved: true,
        onRemove: (filters) => {
            const newFilters = { ...filters }
            delete newFilters.salePrice_gte
            delete newFilters.salePrice_lte
            return newFilters
        },
        onToggle: () => { },
    },
    // {
    //     id: 4,
    //     getLabel: (filters) => `${filters}`,
    //     isActive: () => true,
    //     isVisible: (filters) => Object.keys(filters).includes('category_id'),
    //     isRemoved: true,
    //     onRemove: (filters) => {
    //         const newFilters = { ...filters }
    //         delete newFilters.category_id
    //         return newFilters
    //     },
    //     onToggle: () => { },
    // },
]

FilterViewer.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func
};

function FilterViewer({ filters, onChange }) {
    const visibleFilters = useMemo(() => {
        return FILTER_LIST.filter(x => x.isVisible(filters))
    }, [filters])

    return (
        <Box>
            <List sx={{ display: 'flex', justifyContent: 'flex-start', flexFlow: 'wrap', gap: 2, mt: 1, ml: 2 }}>
                {visibleFilters.map(x => (
                    <Box key={x.id} >
                        <Chip
                            label={x.getLabel(filters)}
                            color={x.isActive(filters) ? 'primary' : 'default'}
                            clickable={!x.isRemoved}
                            onClick={x.isRemoved ? null : () => {
                                if (!onChange) return

                                const newFilters = x.onToggle(filters)
                                onChange(newFilters)
                            }}
                            onDelete={!x.isRemoved ? null : () => {
                                if (!onChange) return

                                const newFilters = x.onRemove(filters)
                                onChange(newFilters)
                            }}
                        />
                    </Box>
                ))}
            </List>
        </Box>
    );
}

export default FilterViewer;