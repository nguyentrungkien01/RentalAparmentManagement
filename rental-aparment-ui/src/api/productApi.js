import axiosClient from './axiosClient';

const productApi = {
    getAll: (params) => {
        const url = '/Account';
        return axiosClient.get(url, { params });
    },

    get: (id) => {
        const url = `/Account/${id}`;
        return axiosClient.get(url);
    },
};

export default productApi;
