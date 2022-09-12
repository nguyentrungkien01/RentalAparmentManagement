import React, { useEffect, useReducer, useState } from 'react';

import Helmet from '../../components/Helmet';
import Table from '../../components/Admin/table/Table';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import accountApi from '../../api/accountApi';
import postApi from '../../api/postApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import numberWithCommas from '../../utils/numberWithCommas';

const Customers = () => {
    const token = localStorage.getItem('token');
    const [accountList, setAccountList] = useState(null);
    const [postList, setPostList] = useState(null);
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
    var postActive;
    var postPending;

    useEffect(() => {
        const fetchAccountList = async () => {
            try {
                const response = await accountApi.getAll(token);

                if (response.code !== 200) {
                    throw new Error(response.message);
                } else {
                    setAccountList(response.data);
                }
            } catch (error) {
                console.log('Thất bại khi lấy danh sách tài khoản: ', error);
                toast.error('Thất bại khi lấy danh sách tài khoản !', { theme: 'colored' });
            }
        };

        const fetchPostList = async () => {
            try {
                const response = await postApi.getAll();

                if (response.code !== 200) {
                    throw new Error(response.message);
                } else {
                    setPostList(response.data);
                    toast.success('Lấy dữ liệu bài viêt thành công !', { theme: 'colored' });
                }
            } catch (error) {
                console.log('Thất bại khi lấy danh sách bài viêt: ', error);
                toast.error('Thất bại khi lấy danh sách bài viêt !', { theme: 'colored' });
            }
        };

        fetchAccountList();
        fetchPostList();
    }, [reducerValue]);

    if (postList) {
        postActive = postList.filter((account) => account.status === 1);
        postPending = postList.filter((account) => account.status === 0);
    }
    let tableHead = ['ID', 'Tiêu đề', 'Nội dung', 'Giá', 'Địa chỉ', 'Like', 'Ngày tạo', 'Người tạo', 'Thao tác'];

    let tableHeadNeedApprove = ['ID', 'Tiêu đề', 'Nội dung', 'Giá', 'Địa chỉ', 'Ngày tạo', 'Người tạo', 'Thao tác'];

    const renderHead = (item, index) => <th key={index}>{item}</th>;

    const renderBody = (item, index) => {
        const acc = accountList.find((account) => account.id === item.accountId);
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <Tippy content={item.title}>
                    <td>{item.title}</td>
                </Tippy>
                <Tippy content={item.content}>
                    <td className="text-ellipsis">{item.content}</td>
                </Tippy>
                <td>{numberWithCommas(item.pricePerMonth)}</td>
                <Tippy content={item.address}>
                    <td className="text-ellipsis">{item.address}</td>
                </Tippy>
                <td>{item.likeAmount}</td>
                <td>{new Date(item.dateCreated).toLocaleDateString('vi-VI')}</td>
                <td>{`${acc.lastName} ${acc.firstName}`}</td>
                <td>
                    <Link to={`/nha-tro/${item.slug}`}>
                        <button className="btn-handle btn-handle-success">Đến bài viết</button>
                    </Link>
                    <button className="btn-handle btn-handle-danger" onClick={() => removePostHandler(item.id)}>
                        Xoá
                    </button>
                </td>
            </tr>
        );
    };

    const renderBodyNeedApprove = (item, index) => {
        const acc = accountList.find((account) => account.id === item.accountId);
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <Tippy content={item.title}>
                    <td>{item.title}</td>
                </Tippy>
                <Tippy content={item.content}>
                    <td className="text-ellipsis">{item.content}</td>
                </Tippy>
                <td>{numberWithCommas(item.pricePerMonth)}</td>
                <Tippy content={item.address}>
                    <td className="text-ellipsis">{item.address}</td>
                </Tippy>
                <td>{new Date(item.dateCreated).toLocaleDateString('vi-VI')}</td>
                <td>{`${acc.lastName} ${acc.firstName}`}</td>
                <td>
                    <button className="btn-handle btn-handle-success" onClick={() => approvePostHandler(item.id)}>
                        Duyệt
                    </button>
                    <button className="btn-handle btn-handle-danger" onClick={() => rejectPostHandler(item.id)}>
                        Từ chối
                    </button>
                </td>
            </tr>
        );
    };

    const removePostHandler = async (id) => {
        try {
            const response = await postApi.putDelete(id, token);
            if (response.code === 200) {
                forceUpdate();
                console.log(response);
                toast.success('Xoá thành công !', { theme: 'colored' });
            } else {
                console.log(response);
                toast.error('Xoá thất bại !', { theme: 'colored' });
            }
        } catch (error) {
            console.log('Thất bại: ', error);
            toast.error('Xoá thất bại !', { theme: 'colored' });
        }
    };

    const rejectPostHandler = async (id) => {
        try {
            const response = await postApi.putReject(id, token);
            if (response.code === 200) {
                forceUpdate();
                console.log(response);
                toast.success('Xoá thành công !', { theme: 'colored' });
            } else {
                console.log(response);
                toast.error('Xoá thất bại !', { theme: 'colored' });
            }
        } catch (error) {
            console.log('Thất bại: ', error);
            toast.error('Xoá thất bại !', { theme: 'colored' });
        }
    };

    const approvePostHandler = async (id) => {
        try {
            const response = await postApi.putApprove(id, token);
            if (response.code === 200) {
                forceUpdate();
                console.log(response);
                toast.success('Xoá thành công !', { theme: 'colored' });
            } else {
                console.log(response);
                toast.error('Xoá thất bại !', { theme: 'colored' });
            }
        } catch (error) {
            console.log('Thất bại: ', error);
            toast.error('Xoá thất bại !', { theme: 'colored' });
        }
    };

    return (
        <Helmet title="Admin | Quản lý bài viết">
            <h2 className="page-header">Quản lý bài viết{postActive ? ` (${postActive.length})` : 0}</h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {postActive ? (
                                postActive.length !== 0 ? (
                                    <Table
                                        limit="3"
                                        headData={tableHead}
                                        renderHead={(item, index) => renderHead(item, index)}
                                        bodyData={postActive}
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
                </div>
            </div>

            <h2 className="page-header">
                Danh sách bài viết cần duyệt
                {postPending ? ` (${postPending.length})` : 0}
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {postPending ? (
                                postPending.length !== 0 ? (
                                    <Table
                                        limit="3"
                                        headData={tableHeadNeedApprove}
                                        renderHead={(item, index) => renderHead(item, index)}
                                        bodyData={postPending}
                                        renderBody={(item, index) => renderBodyNeedApprove(item, index)}
                                    />
                                ) : (
                                    <p>Không có bài viết...</p>
                                )
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
