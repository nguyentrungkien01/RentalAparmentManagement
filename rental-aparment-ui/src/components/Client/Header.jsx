import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import logo from '../../assets/images/Logo-2.png';

const mainNav = [
    {
        display: 'Trang chủ',
        path: '/',
    },
    {
        display: 'Địa điểm',
        path: '/dia-diem',
    },
    {
        display: 'Thuê phòng',
        path: '/nha-tro',
    },
    {
        display: 'Liên hệ',
        path: '/lien-he',
    },
];

const Header = () => {
    const { pathname } = useLocation();
    const activeNav = mainNav.findIndex((e) => e.path === pathname);

    const headerRef = useRef(null);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        });
        return () => {
            window.removeEventListener('scroll', null);
        };
    }, []);

    const menuLeft = useRef(null);

    const menuToggle = () => menuLeft.current.classList.toggle('active');

    // fake api account role
    const role = ['guest', 'customer'];
    const account = [
        {
            role: role[0],
            name: 'test',
        },
        {
            role: role[1],
            name: 'test',
        },
    ];

    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className="bx bx-menu-alt-left"></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className="bx bx-chevron-left"></i>
                        </div>
                        {mainNav.map((item, index) => (
                            <div
                                key={index}
                                className={`header__menu__item header__menu__left__item ${
                                    index === activeNav ? 'active' : ''
                                }`}
                                onClick={menuToggle}
                            >
                                <Link to={item.path}>
                                    <span>{item.display}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="header__menu__right">
                        <Tippy content="Tìm kiếm">
                            <div className="header__menu__item header__menu__right__item">
                                <i className="bx bx-search"></i>
                            </div>
                        </Tippy>
                        <Tippy content="Giỏ hàng">
                            <div className="header__menu__item header__menu__right__item">
                                <Link to="/gio-hang">
                                    <i className="bx bx-shopping-bag"></i>
                                </Link>
                            </div>
                        </Tippy>
                        {account[1].role === 'guest' ? (
                            <>
                                <Tippy content="Quản lý bài viết">
                                    <div className="header__menu__item header__menu__right__item">
                                        <i className="bx bx-edit"></i>
                                    </div>
                                </Tippy>
                                <Tippy content="Đăng xuất">
                                    <div className="header__menu__item header__menu__right__item">
                                        <i className="bx bx-log-out"></i>
                                    </div>
                                </Tippy>
                                <Tippy content={`Chào ${account[1].name}`}>
                                    <div className="header__menu__item header__menu__right__item">
                                        <span style={{ fontSize: '1.2rem' }}> {account[1].name}</span>
                                    </div>
                                </Tippy>
                            </>
                        ) : (
                            <>
                                <Tippy content="Đăng nhập">
                                    <div className="header__menu__item header__menu__right__item">
                                        <Link to="/auth/dang-nhap">
                                            <i className="bx bx-log-in"></i>
                                        </Link>
                                    </div>
                                </Tippy>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
