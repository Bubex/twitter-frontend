import React, { useEffect, createContext, useState } from 'react';
import { css } from '@emotion/core';
import PulseLoader from 'react-spinners/PulseLoader';

import api from '../services/api';
import { Loader } from './styles';
import { connect, disconnect, subscribeToUpdateMe } from '../services/socket';

const Context = createContext();

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function AuthProvider({ children }) {
    const [ loading, setLoading ] = useState(true);
    const [ authenticated, setAuthenticated ] = useState(false);
    const [ profileInfo, setProfileInfo ] = useState([]);
    const [ headerTab, setHeaderTab ] = useState(1);

    useEffect(() => {
        (async function() {
            setLoading(true);

            const token = localStorage.getItem('TWITTER@JWT_TOKEN');

            if(token) {
                api.defaults.headers.Authorization = `Bearer ${token}`;
                setAuthenticated(true);

                const { data } = await api.get('/index');
                setProfileInfo(data);
            }
            
            setLoading(false);

            setupWebSocket();
        })();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        subscribeToUpdateMe(me => setProfileInfo(me));
    }, [profileInfo]);

    function setupWebSocket() {
        disconnect();
        connect(profileInfo.username, profileInfo.username);
    }

    if(loading){
        return (
            <Loader>
                <PulseLoader
                    css={override}
                    size={30}
                    color={"white"}
                    loading={loading}
                />
            </Loader>
        );
    }

    return (
        <Context.Provider value={{ authenticated, setAuthenticated, profileInfo, setProfileInfo, headerTab, setHeaderTab }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };