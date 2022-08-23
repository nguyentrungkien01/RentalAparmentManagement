import React from 'react';

const Page404 = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                fontWeight: 'bold',
                fontSize: '20px',
                textAlign: 'center',
            }}
        >
            <p>Xin lỗi ! Trang không tìm thấy</p>
            <p>Page not found!</p>
        </div>
    );
};

export default Page404;
