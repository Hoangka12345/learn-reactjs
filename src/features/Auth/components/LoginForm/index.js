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

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

function LoginForm(props) {
    const schema = yup.object().shape({
        identifier: yup.string().required('please enter your email')
            .email('PLease enter your valid email address'),
        password: yup.string().required('please enter your password')
            .min(6, 'Please enter at least 6 characters'),
    })

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
        },
        resolver: yupResolver(schema),
    })

    const handelSubmit = async values => {
        const { onSubmit } = props
        if (onSubmit) await onSubmit(values)
    }

    const { isSubmitting } = form.formState

    return (
        <>
            {isSubmitting && <LinearProgress />}

            <Avatar sx={{ margin: '20px auto 10px', backgroundColor: '#9c27b0' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" component="h2" sx={{ textAlign: 'center', color: '#9c27b0' }}>
                Sign in
            </Typography>

            <form onSubmit={form.handleSubmit(handelSubmit)}>
                <InputField name="identifier" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />

                <Button disabled={isSubmitting} fullWidth variant="contained" sx={{ mt: 2 }} type="submit">Login</Button>
            </form>
        </>
    );
}

export default LoginForm;