import axiosClient from './axiosClient';

const apartmentDetailApi = {
    getAll: (params) => {
        const url = '/ApartmentDetail';
        return axiosClient.get(url, { params });
    },
};

export default apartmentDetailApi;
