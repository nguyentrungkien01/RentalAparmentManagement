import React, { useState } from 'react';
import Helmet from '../components/Helmet';
import InfinityList from '../components/InfinityList';

import Button from '../components/Button';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import postApi from '../api/postApi';
import { useReducer } from 'react';

const Homestay = () => {
    const [motelList, setMotelList] = useState(null);
    const [forceValue, forceUpdate] = useReducer((x) => x + 1, 0);

    const filterRef = useRef(null);

    const showHideFilter = () => filterRef.current.classList.toggle('active');

    useEffect(() => {
        const fetchMotelList = async () => {
            try {
                const response = await postApi.getAll();

                if (response.code !== 200) {
                    throw new Error(response.message);
                } else {
                    let res = [];
                    response.data.map((motel) => {
                        if (motel.status === 1) res.push(motel);
                    });
                    setMotelList(res);
                }
            } catch (error) {
                console.log('Thất bại khi lấy danh sách !', error);
            }
        };

        fetchMotelList();
    }, []);

    const formik = useFormik({
        initialValues: {
            address: '',
            FromPrice: '',
            ToPrice: '',
        },
        onSubmit: async (values) => {
            try {
                let request = {};
                if (values.address !== '') {
                    request['Address'] = values.address;
                }
                if (values.FromPrice !== '') {
                    request['FromPrice'] = Number(values.FromPrice);
                }
                if (values.ToPrice !== '') {
                    request['ToPrice'] = Number(values.ToPrice);
                }
                const response = await postApi.filter(request);

                if (response.code === 200) {
                    setMotelList(response.data);
                    forceUpdate();
                    toast.success('Tìm kiếm thành công !', { theme: 'colored' });
                } else {
                    // console.log(response.message);
                    toast.error('Không tìm thấy ! ' + response.data, {
                        theme: 'colored',
                    });
                }
            } catch (error) {
                // console.log('Lỗi !', error.message);
                toast.error('Lỗi ! ' + error.message, { theme: 'colored' });
            }
            // console.log(values);
        },
    });

    useEffect(() => {}, [forceValue]);

    // fix image file 404
    if (motelList) {
        motelList.forEach((motel) => {
            if (motel.image.length === 0) {
                motel.image.push({
                    path: 'https://res.cloudinary.com/dqifjhxxg/image/upload/v1662174238/RentalApartmenntManagement/Motels/products/home-01_1_dzqwoi.jpg',
                });
                motel.image.push({
                    path: 'https://res.cloudinary.com/dqifjhxxg/image/upload/v1662174239/RentalApartmenntManagement/Motels/products/home-01_2_ny6lqs.jpg',
                });
            }
        });
    }

    return (
        <Helmet title="Nhà trọ">
            {motelList ? (
                <div className="catalog">
                    <div className="catalog__filter" ref={filterRef}>
                        <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                            <i className="bx bx-left-arrow-alt"></i>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="catalog__filter__widget">
                                <div className="catalog__filter__widget__title">Tìm kiếm</div>
                                <div className="catalog__filter__widget__content">
                                    <div className="catalog__filter__widget__title__inner">Theo địa chỉ</div>
                                    <input
                                        id="address"
                                        type="text"
                                        name="address"
                                        placeholder="Nhập địa chỉ..."
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                    />
                                    <div className="catalog__filter__widget__title__inner">Theo giá cả</div>
                                    <input
                                        id="fromPrice"
                                        type="text"
                                        name="FromPrice"
                                        placeholder="Nhập giá bắt đầu..."
                                        value={formik.values.FromPrice}
                                        onChange={formik.handleChange}
                                    />
                                    <input
                                        id="toPrice"
                                        type="text"
                                        name="ToPrice"
                                        placeholder="Nhập giá kết thúc..."
                                        value={formik.values.ToPrice}
                                        onChange={formik.handleChange}
                                    />
                                    <input type="submit" className="signin-signup__btn" value="Tìm kiếm" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="catalog__filter__toggle">
                        <Button size="sm" onClick={() => showHideFilter()}>
                            Tìm kiếm
                        </Button>
                    </div>
                    <div className="catalog__content">
                        <InfinityList data={motelList} />
                    </div>
                </div>
            ) : (
                <></>
            )}
        </Helmet>
    );
};

export default Homestay;
