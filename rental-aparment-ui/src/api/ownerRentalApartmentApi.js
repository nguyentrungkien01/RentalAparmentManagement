import axiosClient from './axiosClient';

const ownerRentalApartmentApi = {
    getInfo: (token) => {
        const url = '/OwnerRentalApartment';
        return axiosClient.get(url, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data',
                accept: 'application/json',
            },
        });
    },
};

export default ownerRentalApartmentApi;
