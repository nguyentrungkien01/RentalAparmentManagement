import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import img from '../../assets/images/signin-up/register.svg';

const Signup = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
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
        }),
        onSubmit: (values) => {
            // axios
            //     .post('https://reqres.in/api/register', {
            //         email: values.name,
            //         password: values.password,
            //     })
            //     .then((result) => {
            //         navigate('/');
            //     })
            //     .catch((error) => {
            //         alert('service error');
            //     });
            // navigate('/auth/dang-nhap');
            values = {...values,sexChecked}
            console.log(values);
        },
    });

    const sexs = [
        { id: 0, name: 'male', title: 'Nam' },
        { id: 1, name: 'female', title: 'Nữ' },
    ];

    const [sexChecked, setSexChecked] = useState();

    return (
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
                            <i className="bx bx-key"></i>
                            <input
                                type="password"
                                name="password"
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
    );
};

export default Signup;
