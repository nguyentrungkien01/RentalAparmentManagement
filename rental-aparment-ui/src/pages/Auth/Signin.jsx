import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import md5 from 'md5';

import img from '../../assets/images/signin-up/log.svg';

import signinApi from '../../api/signinApi';

const Signin = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    let passwordMD5;

    useEffect(() => {
        setMessage('');
    }, [phoneNumber, password]);

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
                setPhoneNumber('');
                setPassword('');
                setMessage('');
                navigate('/admin');
            } else {
                setMessage('Đăng nhập thất bại ! Vui lòng kiểm tra lại thông tin');
            }
        } catch (error) {
            console.log('Thất bại khi gửi dữ liệu: ', error.message);
        }
    };

    return (
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
                        <span id="login-failed">{message ? message : null}</span>
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
    );
};

export default Signin;
