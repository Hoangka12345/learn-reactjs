import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Avatar, Button, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PasswordField from '../../../../components/form-controls/PasswordField';
import LinearProgress from '@mui/material/LinearProgress';

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {
    const schema = yup.object().shape({
        fullName: yup.string().required('Moe ai dạy mày để trống thế kia?')
            .test('should has at least two words', 'Please enter at least two words', value => {
                return value.split(' ').length >= 2
            }),
        email: yup.string().required('please enter your email')
            .email('PLease enter your valid email address'),
        password: yup.string().required('please enter your password')
            .min(6, 'Please enter at least 6 characters'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], 'your confirm password does not match'),
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

    const handelSubmit = async values => {
        const { onSubmit } = props
        if (onSubmit) await onSubmit(values)

        form.reset()
    }

    const { isSubmitting } = form.formState

    return (
        <>
            {isSubmitting && <LinearProgress />}

            <Avatar sx={{ margin: '10px auto 0', backgroundColor: '#9c27b0' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" component="h2" sx={{ textAlign: 'center', color: '#9c27b0' }}>
                Sign up
            </Typography>

            <form onSubmit={form.handleSubmit(handelSubmit)}>
                <InputField name="fullName" label="Full name" form={form} />
                <InputField name="email" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <PasswordField name="confirmPassword" label="Confirm password" form={form} />

                <Button disabled={isSubmitting} fullWidth variant="contained" sx={{ mt: 2 }} type="submit">Register</Button>
            </form>
        </>
    );
}

export default RegisterForm;