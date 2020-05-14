import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';

export default function Routes() {
    return (
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/" exact isPrivate component={Dashboard} />
            <Route path={`/profile/:username`} isPrivate component={Profile} />
            <Route path="/settings" isPrivate component={Settings} />
        </Switch>
    );
}