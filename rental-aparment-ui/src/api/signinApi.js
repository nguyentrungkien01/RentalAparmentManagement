import axiosClient from './axiosClient';

const signinApi = {
    postSignIn: (params) => {
        const url = '/SignIn';
        return axiosClient.post(url, params);
    },
};

export default signinApi;
