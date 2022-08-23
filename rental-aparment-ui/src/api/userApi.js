import axiosClient from './axiosClient';

const userApi = {
    getUserDetail: (params) => {
        const url = '/UserDetail';
        return axiosClient.get(url, { params });
    },
};

export default userApi;
