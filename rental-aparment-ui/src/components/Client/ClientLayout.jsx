import React from 'react';

import { Outlet } from 'react-router-dom';

import Header from '../Client/Header';
import Footer from '../Client/Footer';
import MotelViewModal from '../MotelViewModal';

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
            <MotelViewModal />
        </>
    );
};

export default ClientLayout;
