import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';

import { Context } from '../../contexts/AuthContext';
import api from '../../services/api';
import history from '../../services/history';

import logoBlue from '../../assets/logo-blue.png';

export default function Login() {
    const { setAuthenticated, setProfileInfo } = useContext(Context);

    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    async function handleLogin(e) {
        e.preventDefault();
        setMessage(null);
        setLoading(true);

        try {
            const { data } = await api.post('/auth/login', {
                email, password
            });

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
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <img src={logoBlue} width="34px" alt="" />
            <h1>Log in to Twitter</h1>
            <form onSubmit={handleLogin}>
                <input name="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                <input name="password" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <span>{message}</span>
                <button type="submit" disabled={loading}>
                    {loading
                    ? <PulseLoader
                            size={8}
                            color={"white"}
                            loading={loading}
                        />
                    : 'Log in'}</button>
                <Link to="/register">I don't have an account</Link>
            </form>
        </>
    )
}