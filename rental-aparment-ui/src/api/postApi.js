import axiosClient from './axiosClient';

const postApi = {
    postCreate: (params) => {
        const url = '/PostCreate';
        return axiosClient.post(url, { params });
    },
};

export default postApi;
