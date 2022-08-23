import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ClientLayout from './Client/ClientLayout';
import AdminLayout from './Admin/layout/AdminLayout';

import { publicRoutes, privateRoutes, authRoutes } from '../routes/routes';
import Page404 from '../pages/Page404';

const Layout = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ClientLayout />}>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Route>
                <Route path="/auth">
                    {authRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Route>
                <Route path="/admin" element={<AdminLayout />}>
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Route>
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Layout;
