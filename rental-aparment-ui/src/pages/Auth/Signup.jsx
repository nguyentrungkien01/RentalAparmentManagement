import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import md5 from 'md5';

import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import img from '../../assets/images/signin-up/register.svg';
import Helmet from '../../components/Helmet';
import registerApi from '../../api/registerApi';

import { toast } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            code: -1,
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            gender: '',
            idCard: '',
            password: '',
            address: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Vui lòng điền trường này !').min(2, 'Tối thiểu 2 ký tự !'),
            lastName: Yup.string().required('Vui lòng điền trường này !').min(2, 'Tối thiểu 2 ký tự !'),
            email: Yup.string()
                .required('Vui lòng điền trường này !')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập đúng định dạng email !'),
            password: Yup.string().required('Vui lòng điền trường này !').min(6, 'Tối thiểu 6 ký tự !'),
            phone: Yup.string()
                .required('Vui lòng điền trường này !')
                .matches(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    'Phải là định dạng số và đủ 10 ký tự !',
                ),
            idCard: Yup.string()
                .required('Vui lòng điền trường này !')
                .matches(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{6}$/,
                    'Phải là định dạng số và đủ 12 ký tự !',
                ),
        }),
        onSubmit: async (values) => {
            if (sexChecked === 0) {
                values.gender = 'nam';
            } else {
                values.gender = 'nữ';
            }
            values.password = md5(values.password);
            try {
                const params = {
                    code: values.code,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    gender: values.gender,
                    address: values.address,
                    phoneNumber: values.phone,
                    idCard: values.idCard,
                    email: values.email,
                    password: values.password,
                };
                const response = await registerApi.postRegister(params);

                if (response.code === 200) {
                    console.log(response.code);
                    toast.success('Đã gửi mã xác nhận qua email, vui lòng kiểm tra thông tin !', { theme: 'colored' });
                    document.querySelector('.register-modal').classList.add('active');
                } else {
                    console.log(response.data, response.message);

                    toast.error('Đăng ký thất bại, vui lòng kiểm tra thông tin ! ' + response.data, {
                        theme: 'colored',
                    });
                }
            } catch (error) {
                console.log('Thất bại khi gửi dữ liệu: ', error.message);
                toast.error('Thất bại khi gửi dữ liệu ! ' + error.message, { theme: 'colored' });
            }
            console.log(values);
        },
    });

    const register = async (e) => {
        e.preventDefault();
        try {
            const params = {
                code: document.getElementById('verifyCode').value,
                firstName: formik.values.firstName,
                lastName: formik.values.lastName,
                gender: formik.values.gender,
                address: formik.values.address,
                phoneNumber: formik.values.phone,
                idCard: formik.values.idCard,
                email: formik.values.email,
                password: formik.values.password,
            };
            const response = await registerApi.postRegister(params);

            if (response.code === 200) {
                console.log(response.code);
                toast.success('Đăng ký thành công !', { theme: 'colored' });
                setTimeout(() => navigate('/auth/dang-nhap'), 1000);
            } else {
                toast.error('Nhập sai mã, vui lòng nhập lại hoặc đăng ký lại ! ' + response.data, { theme: 'colored' });
            }
        } catch (error) {
            console.log('Thất bại khi gửi dữ liệu: ', error.message);
            toast.error('Thất bại khi gửi dữ liệu, !' + error.message, { theme: 'colored' });
        }
    };

    const sexs = [
        { id: 0, name: 'male', title: 'Nam' },
        { id: 1, name: 'female', title: 'Nữ' },
    ];

    const [sexChecked, setSexChecked] = useState();

    return (
        <Helmet title="Đăng ký">
            <div className="form__container">
                <div className="form__container__content">
                    <div className="signin-signup">
                        <form className="sign-up-form" onSubmit={formik.handleSubmit}>
                            <h2 className="sign-up-form__title">Đăng ký</h2>
                            <div className="signin-signup__input-field">
                                <i className="bx bxs-user-account"></i>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập họ và tên lót..."
                                />
                            </div>
                            {formik.errors.lastName && (
                                <p className="signin-signup__errorMsg"> {formik.errors.lastName} </p>
                            )}

                            <div className="signin-signup__input-field">
                                <i className="bx bxs-user-account"></i>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập tên..."
                                />
                            </div>
                            {formik.errors.firstName && (
                                <p className="signin-signup__errorMsg"> {formik.errors.firstName} </p>
                            )}

                            <div className="signin-signup__input-field">
                                <i className="bx bx-envelope"></i>
                                <input
                                    type="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập email..."
                                />
                            </div>
                            {formik.errors.email && <p className="signin-signup__errorMsg"> {formik.errors.email} </p>}

                            <div className="signin-signup__input-field">
                                <i className="bx bx-map"></i>
                                <input
                                    type="text"
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập địa chỉ..."
                                />
                            </div>

                            <div className="input-gender">
                                <p>Giới tính:</p>
                                {sexs.map((sex) => (
                                    <div key={sex.id}>
                                        <input
                                            type="radio"
                                            checked={sexChecked === sex.id}
                                            id={sex.name}
                                            onChange={() => setSexChecked(sex.id)}
                                        />
                                        <label htmlFor={sex.name}>{sex.title}</label>
                                    </div>
                                ))}
                            </div>

                            <div className="signin-signup__input-field">
                                <i className="bx bx-phone-call"></i>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập số điện thoại..."
                                />
                            </div>
                            {formik.errors.phone && <p className="signin-signup__errorMsg"> {formik.errors.phone} </p>}

                            <div className="signin-signup__input-field">
                                <i className="bx bx-id-card"></i>
                                <input
                                    type="text"
                                    name="idCard"
                                    value={formik.values.idCard}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập CCCD..."
                                />
                            </div>
                            {formik.errors.idCard && (
                                <p className="signin-signup__errorMsg"> {formik.errors.idCard} </p>
                            )}

                            <div className="signin-signup__input-field">
                                <i className="bx bx-key"></i>
                                <input
                                    type="password"
                                    name="password"
                                    autoComplete="true"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập mật khẩu"
                                />
                            </div>
                            {formik.errors.password && (
                                <p className="signin-signup__errorMsg"> {formik.errors.password} </p>
                            )}

                            <input type="submit" className="signin-signup__btn" value="Xác nhận" />
                        </form>
                    </div>
                </div>

                <div className="register-modal">
                    <div className="register-modal__content">
                        <form onSubmit={register}>
                            <div className="signin-signup__input-field">
                                <i className="bx bx-key"></i>
                                <input
                                    type="text"
                                    name="verifyCode"
                                    id="verifyCode"
                                    autoComplete="true"
                                    placeholder="Nhập mã xác minh"
                                    required
                                />
                            </div>
                            <input type="submit" className="signin-signup__btn" value="Đăng ký" />
                        </form>
                    </div>
                </div>

                <div className="form__panels-container">
                    <div className="form__panel form__left-panel">
                        <div className="form__panel__content">
                            <h3>Đã có tài khoản ?</h3>
                            <p>Đăng nhập để sử dụng các tính năng của chúng tôi !</p>
                            <Link to="/auth/dang-nhap">
                                <button className="signin-signup__btn btn__transparent">Đăng nhập</button>
                            </Link>
                        </div>
                        <img src={img} className="form__panel__image" alt="" />
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Signup;
