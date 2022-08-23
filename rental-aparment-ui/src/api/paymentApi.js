import axiosClient from './axiosClient';

const paymentApi = {
    postMomo: (params) => {
        const url = '/Payment/momo';
        return axiosClient.post(url, { params });
    },
    postPay: (params) => {
        const url = '/Payment/pay';
        return axiosClient.post(url, { params });
    },
};

export default paymentApi;
