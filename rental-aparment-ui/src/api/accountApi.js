import axiosClient from './axiosClient';

const accountApi = {
    post: (params) => {
        const url = '/Account';
        return axiosClient.post(url, { params });
    },
    getAll: (params) => {
        const url = '/Account';
        return axiosClient.get(url, { params });
    },
    put: (id) => {
        const url = `/Account/${id}`;
        return axiosClient.put(url);
    },
    delete: (id) => {
        const url = `/Account/${id}`;
        return axiosClient.delete(url);
    },
};

export default accountApi;
