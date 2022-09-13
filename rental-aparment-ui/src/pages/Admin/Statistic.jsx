import React, { useEffect, useState } from 'react';

import Helmet from '../../components/Helmet';

import statisticApi from '../../api/statisticApi';

import { toast } from 'react-toastify';
import Table from '../../components/Admin/table/Table';
import numberWithCommas from '../../utils/numberWithCommas';
import { Link } from 'react-router-dom';
import '../../sass/components/Admin/statistic.scss';

const Statistic = () => {
    const token = localStorage.getItem('token');
    const [postList, setPostList] = useState(null);
    const [topAmount, setTopAmount] = useState(0);

    useEffect(() => {
        const fetchAccountList = async () => {
            try {
                const response = await statisticApi.statistic(topAmount, token);

                if (response.code !== 200) {
                    throw new Error(response.message);
                } else {
                    console.log(response.data);
                    setPostList(response.data);
                    if (topAmount !== 0) toast.success('Lấy dữ liệu thành công !', { theme: 'colored' });
                }
            } catch (error) {
                console.log('Thất bại khi lấy danh sách ! ', error);
                toast.error('Thất bại khi lấy danh sách !', { theme: 'colored' });
            }
        };

        fetchAccountList();

        return clearTimeout();
    }, [topAmount, token]);

    let tableHead = ['Top', 'Tên bài viết', 'Giá', 'Số lượt thích', 'Ngày tạo', 'Thao tác'];

    const renderHead = (item, index) => <th key={index}>{item}</th>;

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.title}</td>
            <td>{numberWithCommas(item.pricePerMonth)} vnđ</td>
            <td>{item.likeAmount}</td>
            <td>{new Date(item.dateCreated).toLocaleDateString('vi-VI')}</td>
            <td>
                <Link to={`/nha-tro/${item.slug}`}>
                    <button className="btn-handle btn-handle-success">Đến bài viết</button>
                </Link>
            </td>
        </tr>
    );

    const getTopLike = () => {
        let value = document.getElementById('amount').value;
        setTimeout(() => {
            if (value !== '') {
                setTopAmount(Number.parseInt(value));
            } else setTopAmount(0);
        }, 500);
    };
    return (
        <Helmet title="Thống kê">
            <div className="col-9">
                <div className="account-form__input-field">
                    <label htmlFor="amount" className="label-title">
                        Thống kê top lượt thích (nhập số dòng muốn hiển thị) <span className="required">*</span>
                    </label>
                    <input
                        id="amount"
                        type="text"
                        name="amount"
                        placeholder="Nhập số dòng hiển thị..."
                        onChange={getTopLike}
                    />
                </div>

                <div className="card full-height">
                    {postList ? (
                        postList.length !== 0 ? (
                            <Table
                                limit="5"
                                headData={tableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={postList}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        ) : (
                            <p>Không có bài viết...</p>
                        )
                    ) : (
                        <p>loading...</p>
                    )}
                </div>
            </div>
        </Helmet>
    );
};

export default Statistic;
