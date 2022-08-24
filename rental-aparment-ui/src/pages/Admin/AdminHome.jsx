import React, { useEffect, useState } from 'react';

import Helmet from '../../components/Helmet';
import StatusCard from '../../components/Admin/status-card/StatusCard';

import accountApi from '../../api/accountApi';

function AdminHome() {
    const [accountList, setAccountList] = useState([]);

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
        <Helmet title="Admin | Trang tổng quan">
            <div>
                <h2 className="page-header">Trang tổng quan</h2>
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <StatusCard icon="bx bx-user-pin" count={accountList.length} title="Tài khoản" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default AdminHome;
