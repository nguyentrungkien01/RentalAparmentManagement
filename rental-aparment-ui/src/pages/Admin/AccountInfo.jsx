import React from 'react';
import Helmet from '../../components/Helmet';
import '../../sass/components/Admin/input.scss';

import AccountInfoItem from '../../components/AccountInfoItem';

const AccountInfo = () => {
    return (
        <Helmet title="Thông tin cá nhân">
            <AccountInfoItem />
        </Helmet>
    );
};

export default AccountInfo;
