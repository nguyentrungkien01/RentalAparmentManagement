import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import accountApi from '../api/accountApi';
import Helmet from '../components/Helmet';
import '../sass/components/Admin/input.scss';

import md5 from 'md5';
import { toast } from 'react-toastify';

const AccountInfo = () => {
    const token = localStorage.getItem('token');
    const [sexChecked, setSexChecked] = useState();
    const sexs = [
        { id: 0, name: 'nam', title: 'Nam' },
        { id: 1, name: 'nữ', title: 'Nữ' },
    ];

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await accountApi.getUserDetail(token);
                if (response.code === 200) {
                    toast.success('Lấy dữ liệu tài khoản thành công !', { theme: 'colored' });
                    console.log(response.data);
                    formik.values.lastName = response.data[0].lastName;
                    formik.values.firstName = response.data[0].firstName;
                    setSexChecked(response.data[0].gender);
                    formik.values.address = response.data[0].address;
                    formik.values.oldPhoneNumber = response.data[0].phoneNumber;
                    formik.values.idCard = response.data[0].idCard;

                    formik.values.email = response.data[0].email;
                } else {
                    toast.error('Thất bại khi lấy dữ liệu ! ' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            } catch (error) {
                toast.error('Thất bại khi lấy thông tin tài khoản ! ' + error.message, { theme: 'colored' });
                console.log('Thất bại khi lấy thông tin tài khoản: ', error);
            }
        };

        fetchAccount();
    }, []);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            gender: '',
            address: '',
            idCard: '',
            email: '',
            password: '',
            oldPhoneNumber: '',
            phoneNumber: '',
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
            oldPhoneNumber: Yup.string()
                .required('Vui lòng điền số điện thoại !')
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
            try {
                const params = {
                    firstName: formik.values.firstName,
                    lastName: formik.values.lastName,
                    gender: sexChecked,
                    address: formik.values.address,
                    phoneNumber: formik.values.phoneNumber,
                    oldPhoneNumber: formik.values.oldPhoneNumber,
                    idCard: formik.values.idCard,
                    email: formik.values.email,
                    password: md5(values.password),
                };
                const response = await accountApi.postUpdateAccount(params, token);
                if (response.code === 200) {
                    toast.success('Cập nhật thành công !', { theme: 'colored' });
                } else {
                    console.log(response.data, response.message);
                    toast.error('Cập nhật thất bại, vui lòng kiểm tra thông tin ! ' + response.data, {
                        theme: 'colored',
                    });
                }
            } catch (error) {
                console.log('Thất bại khi gửi dữ liệu: ', error);
                toast.error('Thất bại khi gửi dữ liệu ! ' + error.message, { theme: 'colored' });
            }
        },
    });

    return (
        <Helmet title="Chỉnh sửa">
            <form className="account-form" onSubmit={formik.handleSubmit}>
                <h2 className="account-form__title">Thông tin tài khoản</h2>
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
                                checked={sexChecked === sex.title}
                                id={sex.name}
                                onChange={() => setSexChecked(sex.title)}
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
                {formik.errors.address && <p className="required"> {formik.errors.address} </p>}

                <div className="account-form__input-field">
                    <label htmlFor="oldPhoneNumber" className="label-title">
                        Số điện thoại <span className="required">*</span>
                    </label>
                    <input
                        id="oldPhoneNumber"
                        type="text"
                        name="oldPhoneNumber"
                        value={formik.values.oldPhoneNumber}
                        onChange={formik.handleChange}
                        placeholder="Nhập số điện thoại..."
                    />
                </div>
                {formik.errors.oldPhoneNumber && <p className="required"> {formik.errors.oldPhoneNumber} </p>}

                <div className="account-form__input-field">
                    <label htmlFor="idCard" className="label-title">
                        CCCD <span className="required">*</span>
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
                {formik.errors.idCard && <p className="required"> {formik.errors.idCard} </p>}

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

                <div className="account-form__input-field">
                    <label htmlFor="phoneNumber" className="label-title">
                        Số điện thoại mới<span className="required">*</span>
                    </label>
                    <input
                        id="phoneNumber"
                        type="text"
                        name="phoneNumber"
                        onChange={formik.handleChange}
                        placeholder="Nhập số điện thoại mới ..."
                    />
                </div>
                {formik.errors.phoneNumber && <p className="required"> {formik.errors.phoneNumber} </p>}
                <input type="submit" className="input-submit__btn" value="Cập nhật" />
            </form>
        </Helmet>
    );
};

export default AccountInfo;
