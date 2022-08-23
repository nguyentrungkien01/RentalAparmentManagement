import axiosClient from './axiosClient';

const commentApi = {
    post: (params) => {
        const url = '/Comment';
        return axiosClient.post(url, { params });
    },
};

export default commentApi;
