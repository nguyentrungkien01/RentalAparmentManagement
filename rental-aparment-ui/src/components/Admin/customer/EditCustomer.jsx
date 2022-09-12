import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import accountApi from '../../../api/accountApi';
import Helmet from '../../Helmet';
import '../../../sass/components/Admin/input.scss';

import { toast } from 'react-toastify';

const EditCustomer = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const param = useParams();
    const formik = useFormik({
        initialValues: {
            id: 0,
            firstName: '',
            lastName: '',
            gender: '',
            address: '',
            phoneNumber: '',
            idCard: '',
            email: '',
            password: '',
            status: 0,
            role: 0,
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
            idCard: Yup.string()
                .required('Vui lòng điền trường này !')
                .matches(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{6}$/,
                    'Phải là định dạng số và đủ 12 ký tự !',
                ),
        }),
        onSubmit: async (values) => {
            if (sexChecked === 0) {
                values.gender = 'Nam';
            } else {
                values.gender = 'Nữ';
            }
            try {
                const params = {
                    id: formik.values.id,
                    firstName: formik.values.firstName,
                    lastName: formik.values.lastName,
                    gender: values.gender,
                    address: formik.values.address,
                    phoneNumber: formik.values.phoneNumber,
                    idCard: formik.values.idCard,
                    email: formik.values.email,
                    password: values.password,
                    status: accountStatus,
                    roleId: accountRole,
                };
                const response = await accountApi.put(params.id, params, token);

                if (response.code === 200) {
                    toast.success('Cập nhật thành công !', { theme: 'colored' });
                    navigate('/admin/nguoi-dung');
                } else {
                    console.log(response.data, response.message);

                    toast.error('Cập nhật thất bại, vui lòng kiểm tra thông tin ! ' + response.data, {
                        theme: 'colored',
                    });
                }
            } catch (error) {
                console.log('Thất bại khi gửi dữ liệu: ', error.message);
                toast.error('Thất bại khi gửi dữ liệu ! ' + error.message, { theme: 'colored' });
            }
        },
    });

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await accountApi.getAll(token);
                if (response.code === 200) {
                    toast.success('Lấy dữ liệu tài khoản thành công !', { theme: 'colored' });
                    response.data.map((account) => {
                        if (account.id == param.id) {
                            if (account) {
                                formik.values.id = account.id;
                                formik.values.lastName = account.lastName;
                                formik.values.firstName = account.firstName;
                                setSexChecked(account.gender === 'Nam' ? 0 : 1);
                                formik.values.address = account.address;
                                formik.values.phoneNumber = account.phoneNumber;
                                formik.values.idCard = account.idCard;
                                formik.values.email = account.email;
                                setAccountStatus(account.status);
                                setAccountRole(account.role === 'user' ? 2 : 1);
                            }
                        }
                    });
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

    const [sexChecked, setSexChecked] = useState();
    const [accountStatus, setAccountStatus] = useState();
    const [accountRole, setAccountRole] = useState();

    const sexs = [
        { id: 0, name: 'nam', title: 'Nam' },
        { id: 1, name: 'nữ', title: 'Nữ' },
    ];

    const status = [
        { id: 0, status: '0', title: 'Vô hiệu' },
        { id: 1, status: '1', title: 'Kích hoạt' },
    ];

    const roles = [
        { id: 2, role: 'user', title: 'User' },
        { id: 1, role: 'admin', title: 'Admin' },
    ];

    return (
        <Helmet title="Chỉnh sửa">
            <form className="account-form" onSubmit={formik.handleSubmit}>
                <h2 className="account-form__title">Chỉnh sửa thông tin</h2>
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
                {formik.errors.address && <p className="required"> {formik.errors.address} </p>}

                <div className="account-form__input-field">
                    <label htmlFor="phone" className="label-title">
                        Số điện thoại <span className="required">*</span>
                    </label>
                    <input
                        id="phoneNumber"
                        type="text"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        placeholder="Nhập số điện thoại..."
                    />
                </div>
                {formik.errors.phoneNumber && <p className="required"> {formik.errors.phoneNumber} </p>}

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

                <div className="input-gender">
                    <p className="label-title">
                        Trạng thái tài khoản<span className="required">*</span>:
                    </p>
                    {status.map((status) => (
                        <div key={status.id}>
                            <input
                                type="radio"
                                name="status"
                                checked={accountStatus === status.id}
                                id={status.status}
                                onChange={() => setAccountStatus(status.id)}
                            />
                            <label htmlFor={status.status}>{status.title}</label>
                        </div>
                    ))}
                </div>

                <div className="input-gender">
                    <p className="label-title">
                        Quyền<span className="required">*</span>:
                    </p>
                    {roles.map((role) => (
                        <div key={role.id}>
                            <input
                                type="radio"
                                name="role"
                                checked={accountRole === role.id}
                                id={role.role}
                                onChange={() => setAccountRole(role.id)}
                            />
                            <label htmlFor={role.role}>{role.title}</label>
                        </div>
                    ))}
                </div>
                <input type="submit" className="input-submit__btn" value="Xác nhận" />
            </form>
        </Helmet>
    );
};

export default EditCustomer;
