import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Pagination, Paper, Typography } from '@mui/material';
import productApi from '../../../api/ProductApi';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';
import ProductSort from '../components/ProductSort';

ListPage.propTypes = {

};

function ListPage(props) {
    const [productlist, setProductList] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 9,
        total: 9
    })
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        _page: 1,
        _limit: 9,
        _sort: 'salePrice:ASC'
    })

    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productApi.getAll(filters)
                setProductList(data.data)
                setPagination({
                    page: pagination.page,
                    limit: pagination.limit,
                    total: pagination.total.data
                })
            } catch (error) {
                console.log('failed to fetch product list:', error);
            }

            setLoading(false)
        })()
    }, [filters])

    const handelChangePage = (e, page) => {
        setFilters(prev => ({
            ...prev,
            _page: page
        }))
    }

    const handelProductSort = (newSortValue) => {
        setFilters(prev => ({
            ...prev,
            _sort: newSortValue
        }))
    }

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item sx={{ with: '250px' }}>
                        <Paper elevation={0}>left page</Paper>
                    </Grid>

                    <Grid item sx={{ flex: '1 1 0' }}>
                        <Paper elevation={0}>
                            <ProductSort currentSort={filters._sort} onChange={handelProductSort} />

                            {loading ? <ProductSkeletonList /> : <ProductList data={productlist} />}

                            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 3, pt: 1 }}>
                                <Pagination
                                    count={Math.ceil(pagination.total / pagination.limit)}
                                    page={pagination.page}
                                    onChange={handelChangePage}
                                    color="primary"
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box >
    );
}

export default ListPage;