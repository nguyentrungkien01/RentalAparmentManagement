import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import { publicRoutes } from '../routes/routes';

const Layout = () => {
    return (
        <BrowserRouter>
            <>
                <Header />
                <div className="container">
                    <div className="main">
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                return <Route key={index} path={route.path} element={<Page />} />;
                            })}
                        </Routes>
                    </div>
                </div>
                <Footer />
            </>
        </BrowserRouter>
    );
};

export default Layout;
