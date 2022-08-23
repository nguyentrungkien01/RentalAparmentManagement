import React, { useEffect, useState } from 'react';
import Helmet from '../../../components/Helmet';

import Table from '../../../components/Admin/table/Table';
import Badge from '../../../components/Admin/badge/Badge';

import accountApi from '../../../api/accountApi';

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
        <td>{item.role}</td>
        <td>
            <Badge type="success" content="Sửa"></Badge>
            <Badge type="warning" content="Cập nhật"></Badge>
            <Badge type="danger" content="Xoá"></Badge>
        </td>
    </tr>
);

const Customers = () => {
    let tableHead = [
        'ID',
        'Họ tên',
        'Giới tính',
        'Địa chỉ',
        'Id Card',
        ' SĐT',
        'Ngày tạo',
        'Email',
        'Vai trò',
        'Thao tác',
    ];
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

    return (
        <Helmet title="Admin | Người dùng">
            <h2 className="page-header">Quản lý người dùng</h2>
            <div className="manipulation">
                <Badge type="primary" content="Thêm"></Badge>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {accountList !== null ? (
                                (console.log(accountList),
                                (
                                    <Table
                                        limit="3"
                                        headData={tableHead}
                                        renderHead={(item, index) => renderHead(item, index)}
                                        bodyData={accountList}
                                        renderBody={(item, index) => renderBody(item, index)}
                                    />
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Customers;
