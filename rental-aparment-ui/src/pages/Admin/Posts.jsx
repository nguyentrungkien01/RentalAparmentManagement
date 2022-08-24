import React from 'react';
import Helmet from '../../components/Helmet';

import Table from '../../components/Admin/table/Table';

import customerList from '../../assets/JsonData/customers-list.json';

const customerTableHead = ['Id', 'Tên', 'Email', 'Điện thoại', 'Địa chỉ', 'Số điện thoại', 'Ngày tạo', 'Thao tác'];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.total_orders}</td>
        <td>{item.total_spend}</td>
        <td>{item.location}</td>
        <td>
            <button className="btn-handle btn-handle-primary">Thêm khách hàng</button>
        </td>
    </tr>
);

const Posts = () => {
    return (
        <Helmet title="Admin | Người dùng">
            <h2 className="page-header">Quản lý Bài viết</h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit="10"
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={customerList}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Posts;
