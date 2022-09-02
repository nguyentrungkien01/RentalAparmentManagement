import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import accountApi from '../../../api/accountApi';
import Helmet from '../../Helmet';
import '../../../sass/components/Admin/input.scss';
const AddCustomer = () => {
    const navigate = useNavigate();

    const [accountList, setAccountList] = useState(null);

    useEffect(() => {
        const fetchAccountList = async () => {
            try {
                const response = await accountApi.getAll();
                setAccountList(response.data);

                if (response.code !== 200) {
                    throw new Error(response.message);
                }
            } catch (error) {
                console.log('Thất bại khi lấy danh sách tài khoản: ', error);
            }
        };

        fetchAccountList();
    }, []);

    const formik = useFormik({
        initialValues: {
            firstName: 'string',
            lastName: 'string',
            gender: 'string',
            address: 'string',
            phoneNumber: 'string',
            idCard: 'string',
            email: 'string',
            password: 'string',
            status: 0,
            roleId: 0,
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Vui lòng điền tên !').min(2, 'Tối thiểu 2 ký tự !'),
            lastName: Yup.string().required('Vui lòng điền họ và tên lót !').min(2, 'Tối thiểu 2 ký tự !'),
            address: Yup.string().required('Vui lòng điền địa chỉ !').min(2, 'Tối thiểu 2 ký tự !'),
            email: Yup.string()
                .required('Vui lòng điền email !')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập đúng định dạng email !'),
            password: Yup.string().required('Vui lòng điền mật khẩu !').min(6, 'Tối thiểu 6 ký tự !'),
            phoneNumber: Yup.string()
                .required('Vui lòng điền số điện thoại !')
                .matches(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    'Phải là định dạng số và đủ 10 ký tự !',
                ),
        }),
        onSubmit: (values) => {
            // "id": 0,
            // "firstName": "string",
            // "lastName": "string",
            // "gender": "string",
            // "address": "string",
            // "phoneNumber": "string",
            // "idCard": "string",
            // "email": "string",
            // "password": "string",
            // "status": 0,
            // "roleId": 0

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
            values = { ...values, sexChecked };
            console.log(values);
        },
    });

    const sexs = [
        { id: 0, name: 'male', title: 'Nam' },
        { id: 1, name: 'female', title: 'Nữ' },
    ];

    const [sexChecked, setSexChecked] = useState();

    return (
        <Helmet title="Chỉnh sửa">
            <form className="account-form" onSubmit={formik.handleSubmit}>
                <h2 className="account-form__title">Thêm tài khoản</h2>
                <div className="account-form__input-field">
                    <label htmlFor="lastName" className="label-title">
                        Họ và tên lót <span className="required">*</span>
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        placeholder="Nhập họ và tên lót..."
                    />
                </div>
                {formik.errors.lastName && <p className="required"> {formik.errors.lastName} </p>}

                <div className="account-form__input-field">
                    <label htmlFor="firstName" className="label-title">
                        Tên <span className="required">*</span>
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        placeholder="Nhập tên..."
                    />
                </div>
                {formik.errors.firstName && <p className="required"> {formik.errors.firstName} </p>}

                <div className="input-gender">
                    <p className="label-title">
                        Giới tính<span className="required">*</span>:
                    </p>
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

                <div className="account-form__input-field">
                    <label htmlFor="address" className="label-title">
                        Địa chỉ <span className="required">*</span>
                    </label>
                    <input
                        id="address"
                        type="text"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        placeholder="Nhập địa chỉ..."
                    />
                </div>

                <div className="account-form__input-field">
                    <label htmlFor="phone" className="label-title">
                        Số điện thoại <span className="required">*</span>
                    </label>
                    <input
                        id="phone"
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        placeholder="Nhập số điện thoại..."
                    />
                </div>
                {formik.errors.phone && <p className="required"> {formik.errors.phone} </p>}

                <div className="account-form__input-field">
                    <label htmlFor="idCard" className="label-title">
                        Id card <span className="required">*</span>
                    </label>
                    <input
                        id="idCard"
                        type="text"
                        name="idCard"
                        value={formik.values.idCard}
                        onChange={formik.handleChange}
                        placeholder="Nhập id card..."
                    />
                </div>

                <div className="account-form__input-field">
                    <label htmlFor="email" className="label-title">
                        Email <span className="required">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        placeholder="Nhập email..."
                    />
                </div>
                {formik.errors.email && <p className="required"> {formik.errors.email} </p>}

                <div className="account-form__input-field">
                    <label htmlFor="password" className="label-title">
                        Mật khẩu <span className="required">*</span>
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder="Nhập mật khẩu"
                    />
                </div>
                {formik.errors.password && <p className="required"> {formik.errors.password} </p>}

                <input type="submit" className="input-submit__btn" value="Xác nhận" />
            </form>
        </Helmet>
    );
};

export default AddCustomer;
