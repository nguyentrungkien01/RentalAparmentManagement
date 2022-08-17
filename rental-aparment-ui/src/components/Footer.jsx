import React from 'react';

import { Link } from 'react-router-dom';

import Grid from './Grid';

import logo from '../assets/images/Logo-2.png';

const footerAboutLinks = [
    {
        display: 'Giới thiệu',
        path: '/',
    },
    {
        display: 'Truyền thông',
        path: '/',
    },
    {
        display: 'Tuyển dụng',
        path: '/',
    },
    {
        display: 'Tin tức',
        path: '/',
    },
];

const footerCustomerLinks = [
    {
        display: 'Trung tâm trợ giúp',
        path: '/',
    },
    {
        display: 'An toàn mua bán',
        path: '/',
    },
    {
        display: 'Quy định cần biết',
        path: '/',
    },
    {
        display: 'Liên hệ hỗ trợ',
        path: '/',
    },
];

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <Grid col={4} mdCol={2} smCol={1} gap={10}>
                    <div>
                        <div className="footer__title">Tổng đài hỗ trợ</div>
                        <div className="footer__content">
                            <p>
                                Liên hệ: <strong>0123456789</strong>
                            </p>
                            <p>
                                Thắc mắc: <strong>0123456789</strong>
                            </p>
                            <p>
                                Góp ý, khiếu nại: <strong>0123456789</strong>
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">Về Yolo</div>
                        <div className="footer__content">
                            {footerAboutLinks.map((item, index) => (
                                <p key={index}>
                                    <Link to={item.path}>{item.display}</Link>
                                </p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">Chăm sóc khách hàng</div>
                        <div className="footer__content">
                            {footerCustomerLinks.map((item, index) => (
                                <p key={index}>
                                    <Link to={item.path}>{item.display}</Link>
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="footer__about">
                        <p>
                            <Link to="/">
                                <img src={logo} className="footer__logo" alt="" />
                            </Link>
                        </p>
                        <p>
                            Hướng đến mục tiêu tìm trọ nhanh chóng và tiện lợi với mức giá phải chăng. Hãy để Yolo đồng
                            hành cùng bạn.
                        </p>
                    </div>
                </Grid>
            </div>
        </footer>
    );
};

export default Footer;
