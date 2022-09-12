import axiosClient from './axiosClient';

const ratingApi = {
    postRating: (params, token) => {
        const url = '/Rating';
        return axiosClient.post(url, params, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        });
    },
};

export default ratingApi;
