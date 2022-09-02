import axiosClient from './axiosClient';

const registerApi = {
    postRegister: (params) => {
        const url = '/Register';
        return axiosClient.post(url, params);
    },
};

export default registerApi;
