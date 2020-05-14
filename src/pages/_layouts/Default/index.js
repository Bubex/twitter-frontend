import React from 'react';

import Header from './Header';
import Footer from './Footer';

import { Background } from './styles';

export default function DefaultLayout({ children }) {
    return (
        <Background>
            <Header />
            <main>{children}</main>
            <Footer />
        </Background>
    );
}