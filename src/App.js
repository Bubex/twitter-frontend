import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './routes';
import history from './services/history';

import GlobalStyle from './styles/global';

import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <>
        <AuthProvider>
            <Router history={history}>
                <Routes />
            </Router>
        </AuthProvider>
        <GlobalStyle />
    </>
  );
}

export default App;