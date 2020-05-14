import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../components/Input';
import { Context } from '../../contexts/AuthContext';
import api from '../../services/api';
import history from '../../services/history';

import logoBlue from '../../assets/logo-blue.png';

const schema = Yup.object().shape({
    username: Yup.string()
                .min(4, 'Your username must be between 4 and 16 characters')
                .max(16, 'Your username must be between 4 and 16 characters')
                .matches('^[a-zA-Z0-9]*$', 'Your username cannot contain blanks or special characters'),
    name: Yup.string().min(3, 'Your name must be at least 3 characters').required('Enter your fullname'),
    email: Yup.string().email('Enter a valid email').required('An email is required'),
    password: Yup.string().required('Choose a password').min(8, 'The password must be at least 8 characters'),
    password2: Yup.string().oneOf([Yup.ref('password'), null], 'The passwords do not match').required('Confirm your password')
});

export default function Login() {
    const { setAuthenticated, setProfileInfo } = useContext(Context);
    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState('');
    const formRef = useRef(null);

    async function handleRegister(formData) {
        setMessage(null);
        setLoading(true);

        try {
            formRef.current.setErrors({});
            await schema.validate(formData, {
              abortEarly: false,
            });
            
            const { data } = await api.post('/auth/register', formData);

            if(data.error){
                setMessage(data.error);
                return;
            }

            localStorage.setItem('TWITTER@JWT_TOKEN', data.token);
            api.defaults.headers.Authorization = `Bearer ${data.token}`;
            setAuthenticated(true);

            localStorage.setItem('TWITTER@PROFILE', JSON.stringify(data.user));
            setProfileInfo(data.user);

            history.push('/');
        } catch (err) {
            const validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                validationErrors[error.path] = error.message;
                });
                formRef.current.setErrors(validationErrors);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <img src={logoBlue} width="34px" alt="Twitter" />
            <h1>Sign in to Twitter</h1>
            <Form schema={schema} onSubmit={handleRegister} ref={formRef} >
                <Input name="name" placeholder="Full name"/>
                <Input name="username" placeholder="Username"/>
                <Input name="email" type="email" placeholder="E-mail"/>
                <Input name="password" type="password" placeholder="Password"/>
                <Input name="password2" type="password" placeholder="Confirm Password"/>
                {message != null ? <span>{message}</span> : null}
                <button type="submit" disabled={loading}>
                    {loading
                    ? <PulseLoader
                            size={8}
                            color={"white"}
                            loading={loading}
                        />
                    : 'Sign in'}</button>
                <Link to="/login">Log in</Link>
            </Form>
        </>
    )
}