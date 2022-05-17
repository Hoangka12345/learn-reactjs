import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';
import { useDispatch } from 'react-redux';
import { register } from '../../UserSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

Register.propTypes = {
    closeDialog: PropTypes.func
};

function Register(props) {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const handelSubmit = async (value) => {
        try {
            value.username = value.email
            const action = register(value)
            const resultAction = await dispatch(action)
            const user = unwrapResult(resultAction)

            const { closeDialog } = props
            if (closeDialog) closeDialog()
            enqueueSnackbar('Register successfully!!!', { variant: 'success' });
        } catch (error) {
            console.log('failed to register: ', error)
        }
    }

    return (
        <div>
            <RegisterForm onSubmit={handelSubmit} />
        </div>
    );
}

export default Register;