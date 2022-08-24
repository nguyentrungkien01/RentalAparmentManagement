import React from 'react';

import { Outlet } from 'react-router-dom';

import '../../../sass/components/Admin/grid.css';
import '../../../sass/components/Admin/index.css';
import '../../../sass/components/Admin/button.css';
import '../../../components/Admin/layout/layout.css';

import Sidebar from '../sidebar/Sidebar';
import Topnav from '../topnav/TopNav';

const AdminLayout = () => {
    return (
        <div className={`layout`}>
            <Sidebar />
            <div className="layout__content">
                <Topnav />
                <div className="layout__content-main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
