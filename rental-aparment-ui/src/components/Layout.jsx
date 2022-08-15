import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import { publicRoutes } from '../routes/routes';
const Layout = () => {
    return (
        <>
            <div className="container">
                <Header />
                <div className="main">
                    <BrowserRouter>
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                return <Route key={index} path={route.path} element={<Page />} />;
                            })}
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Layout;
