import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { login } from '../../UserSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import LoginForm from '../LoginForm';

Login.propTypes = {
    closeDialog: PropTypes.func
};

function Login(props) {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const handelSubmit = async (value) => {
        try {
            const action = login(value)
            const resultAction = await dispatch(action)
            const user = unwrapResult(resultAction)

            const { closeDialog } = props
            if (closeDialog) closeDialog()
        } catch (error) {
            console.log('failed to register: ', error)
        }
    }

    return (
        <div>
            <LoginForm onSubmit={handelSubmit} />
        </div>
    );
}

export default Login;