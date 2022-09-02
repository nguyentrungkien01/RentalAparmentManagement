import axiosClient from './axiosClient';

const postApi = {
    post: (params) => {
        const url = '/Post/create';
        return axiosClient.post(url, params);
    },
    getAll: () => {
        const url = '/Post/list';
        return axiosClient.get(url);
    },
    putApprove: (id) => {
        const url = `/Post/approve/${id}`;
        return axiosClient.put(url);
    },
    putReject: (id) => {
        const url = `/Post/reject/${id}`;
        return axiosClient.put(url);
    },
    putDelete: (id) => {
        const url = `/Post/delete/${id}`;
        return axiosClient.put(url);
    },
};

export default postApi;
