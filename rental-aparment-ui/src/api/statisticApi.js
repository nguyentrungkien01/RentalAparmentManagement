import axiosClient from './axiosClient';

const statisticApi = {
    statistic: (amount, token) => {
        const url = `/Statistic?Amount=${amount}`;
        return axiosClient.get(url, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        });
    },
};

export default statisticApi;
