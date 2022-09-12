import axiosClient from './axiosClient';

const paymentApi = {
    postMomo: (params, token) => {
        const url = '/Payment/momo';
        return axiosClient.post(url, params, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data',
                accept: 'application/json',
            },
        });
    },
    postPay: (params, token) => {
        const url = '/Payment/pay';
        console.log(params);
        return axiosClient.post(url, params, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data',
                accept: 'application/json',
            },
        });
    },
};

export default paymentApi;
