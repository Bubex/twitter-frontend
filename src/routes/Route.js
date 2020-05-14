import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { Context } from '../contexts/AuthContext';

import DefaultLayout from '../pages/_layouts/Default';
import AuthLayout from '../pages/_layouts/Auth';

export default function RouteWrapper({ component: Component, isPrivate = false, ...rest}) {
    const { authenticated } = useContext(Context);

    if(!authenticated && isPrivate) {
        return <Redirect to ="/login" />
    }

    if(authenticated && !isPrivate) {
        return <Redirect to="/" />
    }

    const Layout = (authenticated) ? DefaultLayout : AuthLayout;

    return (
        <Route
            { ... rest }
            render={props => (
                <Layout>
                    <Component { ...props} />
                </Layout>
            )}
        />
    );
}

RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

RouteWrapper.defaultProps = {
    isPrivate: false,
};