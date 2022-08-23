import axiosClient from './axiosClient';

const ratingApi = {
    postRating: (params) => {
        const url = '/Rating';
        return axiosClient.post(url, { params });
    },
};

export default ratingApi;
