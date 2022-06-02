import React, { useEffect, useMemo, useState } from 'react';
import { Box, Container, Grid, Pagination, Paper } from '@mui/material';
import productApi from '../../../api/ProductApi';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';
import ProductSort from '../components/ProductSort';
import ProductFilters from '../components/ProductFilters';
import FilterViewer from '../components/FilterViewer';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from "query-string";

function ListPage(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = useMemo(() => {
        const param = queryString.parse(location.search)

        return {
            ...param,
            _page: param._page || 1,
            _limit: param._limit || 9,
            _sort: param._sort || 'salePrice:ASC',
            isPromotion: param._isPromotion === 'true',
            isFreeShip: param.isFreeShip === 'true',
        }
    }, [location.search])

    const [productlist, setProductList] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 9,
        total: 9
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productApi.getAll(queryParams)
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
    }, [queryParams])

    const handelChangePage = (e, page) => {
        navigate({
            path: "/",
            search: queryString.stringify({
                ...queryParams,
                _page: page
            }),
        });
    }

    const handelProductSort = (newSortValue) => {
        navigate({
            path: "/",
            search: queryString.stringify({
                ...queryParams,
                _sort: newSortValue
            }),
        });
    }

    const handelChangeFilter = (newFilter) => {
        navigate({
            path: "/",
            search: queryString.stringify({
                ...queryParams,
                ...newFilter,
            }),
        });
    }

    const handelFilterViewer = (newFilter) => {
        navigate({
            path: "/",
            search: queryString.stringify(newFilter),
        });
    }

    return (
        <Box>
            <Container Width='lg'>
                <Grid container spacing={1}>
                    <Grid item sx={{ width: '250px' }}>
                        <Paper elevation={0}>
                            <ProductFilters filters={queryParams} onChange={handelChangeFilter} />
                        </Paper>
                    </Grid>

                    <Grid item sx={{ flex: '1 1 0' }}>
                        <Paper elevation={0}>
                            <ProductSort currentSort={queryParams._sort} onChange={handelProductSort} />
                            <FilterViewer filters={queryParams} onChange={handelFilterViewer} />

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