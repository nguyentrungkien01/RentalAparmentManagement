import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import '../sidebar/sidebar.css';

import logo from '../../../assets/images/Logo-2.png';

import sidebar_items from '../../../assets/JsonData/sidebar_routes.json';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
    const slug = useLocation();
    const activeItem = sidebar_items.findIndex((item) => item.route === slug.pathname);
    return (
        <div className="sidebar">
            <div className="sidebar__logo">
                <img src={logo} alt="company logo" />
            </div>
            {sidebar_items.map((item, index) => (
                <Link to={item.route} key={index}>
                    <SidebarItem title={item.display_name} icon={item.icon} active={index === activeItem} />
                </Link>
            ))}
        </div>
    );
};

export default Sidebar;
