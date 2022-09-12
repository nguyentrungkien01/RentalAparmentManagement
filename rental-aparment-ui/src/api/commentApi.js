import axiosClient from './axiosClient';

const commentApi = {
    post: (params, token) => {
        const url = '/Comment';
        return axiosClient.post(url, params, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        });
    },
};

export default commentApi;
