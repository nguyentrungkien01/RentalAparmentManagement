import axiosClient from './axiosClient';

const likeApi = {
    postUpdateLike: (params) => {
        const url = '/UpdateLike';
        return axiosClient.post(url, { params });
    },
};

export default likeApi;
