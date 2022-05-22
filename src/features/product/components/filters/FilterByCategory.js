import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import categoryApi from '../../../../api/CategoryApi';
import { Box, List, ListItem, ListItemText } from '@mui/material';

FilterByCategory.propTypes = {
    onChange: PropTypes.func
};

function FilterByCategory({ onChange }) {
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const list = await categoryApi.getAll()
                setCategoryList(list.data)
            } catch (error) {
                console.log('fail to fectch category list', error);
            }
        })()
    }, [])

    const handelCategoryClick = categoryid => {
        if (!onChange) return

        onChange(categoryid)
    }

    return (
        <Box>
            <List >
                {categoryList.map(category => {
                    return (
                        <ListItem
                            key={category.id}
                            onClick={() => handelCategoryClick(category.id)}
                            sx={{ cursor: 'pointer', color: '#666' }}
                        >
                            <ListItemText
                                primary={category.name}
                            />
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    );
}

export default FilterByCategory;