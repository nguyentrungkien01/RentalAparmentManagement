import axiosClient from './axiosClient';

const accountApi = {
    post: (params) => {
        const url = '/Account';
        return axiosClient.post(url, { params });
    },
    postUpdateAccount: (params, token) => {
        const url = '/UpdateAccount';
        return axiosClient.post(url, params, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        });
    },
    getAll: (token) => {
        const url = '/Account';
        return axiosClient.get(url, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        });
    },
    getUserDetail: (token) => {
        const url = '/UserDetail';
        return axiosClient.get(url, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        });
    },
    put: (id, params, token) => {
        const url = `/Account/${id}`;
        return axiosClient.put(url, params, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        });
    },
    delete: (id, token) => {
        const url = `/Account/${id}`;
        return axiosClient.delete(url, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        });
    },
};

export default accountApi;
