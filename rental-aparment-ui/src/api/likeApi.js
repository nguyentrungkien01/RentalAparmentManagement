import axiosClient from './axiosClient';

const likeApi = {
    postUpdateLike: (params, token) => {
        const url = '/UpdateLike';
        return axiosClient.post(url, null, {
            params,
            ...{
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            },
        });
    },
};

export default likeApi;
