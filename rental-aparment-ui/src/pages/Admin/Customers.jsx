import React, { useEffect, useReducer, useState } from 'react';
import Helmet from '../../components/Helmet';

import Table from '../../components/Admin/table/Table';

import accountApi from '../../api/accountApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Customers = () => {
    const [accountList, setAccountList] = useState(null);
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAccountList = async () => {
            try {
                const response = await accountApi.getAll();

                if (response.code !== 200) {
                    throw new Error(response.message);
                } else {
                    setAccountList(response.data);
                    toast.success('Lấy dữ liệu tài khoản thành công !', { theme: 'colored' });
                }
            } catch (error) {
                console.log('Thất bại khi lấy danh sách tài khoản: ', error);
                toast.error('Thất bại khi lấy danh sách tài khoản !', { theme: 'colored' });
            }
        };

        fetchAccountList();
    }, [reducerValue]);

    let tableHead = [
        'ID',
        'Họ tên',
        'Giới tính',
        'Địa chỉ',
        'CCCD',
        ' SĐT',
        'Ngày tạo',
        'Email',
        'Trạng thái',
        'Vai trò',
        'Thao tác',
    ];

    const renderHead = (item, index) => <th key={index}>{item}</th>;

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.id}</td>
            <td>
                {item.lastName} {item.firstName}
            </td>
            <td>{item.gender}</td>
            <td>{item.address}</td>
            <td>{item.idCard}</td>
            <td>{item.phoneNumber}</td>
            <td>{new Date(item.dateCreated).toLocaleDateString('vi-VI')}</td>
            <td>{item.email}</td>
            <td>{item.status === 1 ? 'Hoạt động' : 'Vô hiệu'}</td>
            <td>{item.role}</td>
            <td>
                <Link to={`/admin/nguoi-dung/chinh-sua/${item.id}`}>
                    <button className="btn-handle btn-handle-success">Sửa</button>
                </Link>
                <button className="btn-handle btn-handle-danger" onClick={() => removeAccountHandler(item.id, token)}>
                    Xoá
                </button>
            </td>
        </tr>
    );
    const removeAccountHandler = async (id, token) => {
        try {
            const response = await accountApi.delete(id, token);
            if (response.code === 200) {
                toast.success('Xoá tài khoản thành công!', { theme: 'colored' });
                forceUpdate();
            }
        } catch (error) {
            console.log('Thất bại: ', error);
            toast.error('Xoá thất bại !', { theme: 'colored' });
        }
    };
    return (
        <Helmet title="Admin | Người dùng">
            <h2 className="page-header">Quản lý người dùng{accountList ? ` (${accountList.length})` : 0}</h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {accountList ? (
                                <Table
                                    limit="5"
                                    headData={tableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={accountList}
                                    renderBody={(item, index) => renderBody(item, index)}
                                />
                            ) : (
                                <p>loading...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Customers;
