import React from 'react';

import { Outlet } from 'react-router-dom';

import Header from '../Client/Header';
import Footer from '../Client/Footer';

const ClientLayout = () => {
    return (
        <>
            <Header />
            <div className="container">
                <div className="main">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ClientLayout;
