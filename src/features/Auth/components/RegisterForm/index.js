import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Avatar, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {
    const schema = yup.object().shape({
        fullName: yup.string().required('Moe ai day may de trong the kia')
            .min(5, 'Title too short'),
        email: yup.string().required('please enter your email')
            .email('PLease enter your valid email address')

    })

    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
    })

    const handelSubmit = values => {
        const { onSubmit } = props
        if (onSubmit) onSubmit(values)
    }
    return (
        <>
            <Avatar sx={{ margin: '0 auto', backgroundColor: '#9c27b0' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" component="h2" sx={{ textAlign: 'center', color: '#9c27b0' }}>
                Sign up
            </Typography>

            <form onSubmit={form.handleSubmit(handelSubmit)}>
                <InputField name="fullName" label="Full name" form={form} />
                <InputField name="email" label="Email" form={form} />
                <InputField name="password" label="Password" form={form} />
                <InputField name="confirmPassword" label="Confirm password" form={form} />
            </form>
        </>
    );
}

export default RegisterForm;