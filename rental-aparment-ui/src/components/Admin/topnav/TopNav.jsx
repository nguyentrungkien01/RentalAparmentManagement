import React, { useEffect, useState } from 'react';

import '../topnav/topnav.css';

import { Link } from 'react-router-dom';

import Dropdown from '../dropdown/Dropdown';

import user_image from '../../../assets/images/user.png';

import user_menu from '../../../assets/JsonData/user_menus.json';

const renderUserToggle = (username) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user_image} alt="" />
        </div>
        <div className="topnav__right-user__name">{username}</div>
    </div>
);

const renderUserMenu = (item, index) => (
    <Link to={item.href} key={index}>
        <div className="notification-item" id={item.id !== null ? item.id : null}>
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
);

const Topnav = () => {
    useEffect(() => {
        let log;
        async function getLogout() {
            log = document.getElementById('logout');
            log.addEventListener('click', () => {
                localStorage.removeItem('token');
                localStorage.removeItem('accountName');
            });
        }
        getLogout();
    }, []);

    return (
        <div className="topnav">
            <div className="topnav__search">
                <input type="text" placeholder="Tìm kiếm..." />
                <i className="bx bx-search"></i>
            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(localStorage.getItem('accountName'))}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>
                <i className="bx bx-caret-down"></i>
            </div>
        </div>
    );
};

export default Topnav;
