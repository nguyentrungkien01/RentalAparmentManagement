import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import md5 from 'md5';

import img from '../../assets/images/signin-up/log.svg';

import signinApi from '../../api/signinApi';

import { toast } from 'react-toastify';

import Helmet from '../../components/Helmet';

const Signin = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    let passwordMD5;

    let handleApi = async (e) => {
        passwordMD5 = md5(password);
        e.preventDefault();
        try {
            const params = {
                phoneNumber: phoneNumber,
                password: passwordMD5,
            };
            const response = await signinApi.postSignIn(params);

            if (response.code === 200) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('accountName', ` ${response.data.LastName} ${response.data.FirstName}`);
                setPhoneNumber('');
                setPassword('');
                navigate('/admin');
            } else {
                toast.error('Đăng nhập thất bại, vui lòng kiểm tra thông tin !', { theme: 'colored' });
            }
        } catch (error) {
            console.log('Thất bại khi gửi dữ liệu: ', error.message);
            toast.error('Thất bại khi gửi dữ liệu', { theme: 'colored' });
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) navigate('/admin');
    }, [navigate]);

    return (
        <Helmet title="Đăng nhập">
            <div className="form__container">
                <div className="form__container__content">
                    <div className="signin-signup">
                        <form className="sign-in-form" onSubmit={handleApi}>
                            <h2 className="sign-up-form__title">Đăng nhập</h2>
                            <div className="signin-signup__input-field">
                                <i className="bx bx-user"></i>
                                <input
                                    type="text"
                                    placeholder="Nhập số điện thoại..."
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <div className="signin-signup__input-field">
                                <i className="bx bx-lock-open-alt"></i>
                                <input
                                    type="password"
                                    placeholder="Nhập mật khẩu..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="signin-signup__btn">
                                Đăng nhập
                            </button>
                        </form>
                    </div>
                </div>

                <div className="form__panels-container">
                    <div className="form__panel form__left-panel">
                        <div className="form__panel__content">
                            <h3>Bạn mới đến lần đầu ?</h3>
                            <p>Hãy đăng ký để sử dụng các dịch vụ của chúng tôi</p>{' '}
                            <Link to="/auth/dang-ky">
                                <button className="signin-signup__btn btn__transparent">Đăng ký</button>
                            </Link>
                        </div>
                        <img src={img} className="form__panel__image" alt="" />
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Signin;
