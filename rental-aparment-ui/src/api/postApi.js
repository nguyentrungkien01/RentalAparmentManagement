import axiosClient from './axiosClient';

const postApi = {
    post: (params, token) => {
        const url = '/Post/create';
        return axiosClient.post(url, params, {
            headers: {
                Authorization: 'Bearer ' + token,
                'content-type': 'multipart/form-data',
                accept: 'multipart/form-data',
            },
        });
    },
    getAll: () => {
        const url = '/Post/list';
        return axiosClient.get(url);
    },
    viewDetails: (id) => {
        const url = `/ApartmentDetail?Id=${id}`;
        return axiosClient.get(url);
    },
    filter: (params) => {
        const url = '/ViewApartment';
        return axiosClient.get(url, { params });
    },
    putApprove: (id, token) => {
        const url = `/Post/approve/${id}`;
        return axiosClient.put(url, null, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        });
    },
    putReject: (id, token) => {
        const url = `/Post/reject/${id}`;
        return axiosClient.put(url, null, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        });
    },
    putDelete: (id, token) => {
        const url = `/Post/delete/${id}`;
        return axiosClient.put(url, null, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        });
    },
};

export default postApi;
