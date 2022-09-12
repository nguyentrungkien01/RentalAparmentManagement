import React, { useEffect, useState } from 'react';

import Helmet from '../../components/Helmet';
import StatusCard from '../../components/Admin/status-card/StatusCard';
import { useNavigate } from 'react-router-dom';

import accountApi from '../../api/accountApi';
import postApi from '../../api/postApi';

import { toast } from 'react-toastify';

function AdminHome() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [accountList, setAccountList] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('role') === 'admin') navigate('/admin');
            if (localStorage.getItem('role') === 'user') navigate('/');
        } else navigate('/auth/dang-nhap');
    }, [navigate]);

    const [postList, setPostList] = useState([]);
    var postActive, postPending, accountActive, accountDisabled;

    useEffect(() => {
        const fetchAccountList = async () => {
            try {
                const response = await accountApi.getAll(token);

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
    }, []);

    if (postList) {
        postActive = postList.filter((account) => account.status === 1);
        postPending = postList.filter((account) => account.status === 0);
    }

    if (accountList) {
        accountActive = accountList.filter((account) => account.status === 1);
        accountDisabled = accountList.filter((account) => account.status === 0);
    }

    return (
        <Helmet title="Admin | Trang tổng quan">
            <div>
                <h2 className="page-header">Tổng quan tài khoản ({accountList.length})</h2>
                <div className="row">
                    <div className="col-3">
                        <StatusCard
                            icon="bx bx-user-pin"
                            count={accountActive.length}
                            title="Tài khoản đang hoạt động"
                        />
                    </div>
                    <div className="col-3">
                        <StatusCard
                            icon="bx bx-user-pin"
                            count={accountDisabled.length}
                            title="Tài khoản ngừng hoạt động"
                        />
                    </div>
                </div>
            </div>
            <div>
                <h2 className="page-header">Tổng quan bài viết ({postList.length})</h2>
                <div className="row">
                    <div className="col-3">
                        <StatusCard icon="bx bxs-id-card" count={postActive.length} title="Bài viết đã duyệt" />
                    </div>
                    <div className="col-3">
                        <StatusCard icon="bx bx-id-card" count={postPending.length} title="Bài viết đang chờ duyệt" />
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default AdminHome;
