import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Section, { SectionBody, SectionTitle } from '../components/Section';
import { toast } from 'react-toastify';
import postApi from '../api/postApi';
import accountApi from '../api/accountApi';

const PostCreate = () => {
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await accountApi.getUserDetail(token);
                if (response.code === 200) {
                    console.log(response, 'Lấy dữ liệu tài khoản thành công');
                } else {
                    toast.error('Thất bại khi lấy dữ liệu ! ' + response.message, { theme: 'colored' });
                    throw new Error(response.message);
                }
            } catch (error) {
                toast.error('Thất bại khi lấy thông tin tài khoản ! ' + error.message, { theme: 'colored' });
                console.log('Thất bại khi lấy thông tin tài khoản: ', error);
            }
        };

        fetchAccount();
    }, []);

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            pricePerMonth: 0,
            address: '',
            longitude: '0',
            latitude: '0',
            accountId: 0,
            files: [],
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Vui lòng nhập tiêu đề !').min(10, 'Tối thiểu 10 ký tự !'),
            content: Yup.string().required('Vui lòng nhập nội dung !').min(10, 'Tối thiểu 10 ký tự !'),
            pricePerMonth: Yup.string()
                .required('Vui lòng nhập giá !')
                .matches(/^[0-9]*$/, 'Phải là định dạng số !'),
            address: Yup.string().required('Vui lòng nhập địa chỉ !').min(10, 'Tối thiểu 10 ký tự !'),
            files: Yup.mixed().required('Vui lòng upload file !'),
        }),
        onSubmit: async (values) => {
            let amountFileUpload = document.getElementById('files');
            if (amountFileUpload.files.length >= 2) {
                try {
                    const params = {
                        Title: values.title,
                        Content: values.content,
                        PricePerMonth: values.pricePerMonth,
                        Address: values.address,
                        Longitude: values.longitude,
                        Latitude: values.latitude,
                        AccountId: 21,
                        Slug: toSlug(values.title),
                        files: values.files,
                    };
                    console.log(params);
                    const response = await postApi.post(params, token);

                    if (response.code === 200) {
                        console.log(response);
                        formik.values.title = '';
                        formik.values.pricePerMonth = '';
                        formik.values.address = '';
                        formik.values.files = [];
                        toast.success('Đã gửi bài viết cho QTV kiểm duyệt !', { theme: 'colored' });
                    } else {
                        console.log(response.data, response.message);

                        toast.error('Tạo bài viết thất bại ! ' + response.data, {
                            theme: 'colored',
                        });
                    }
                } catch (error) {
                    console.log('Thất bại khi gửi dữ liệu: ', error);
                    toast.error('Thất bại khi gửi dữ liệu ! ' + error.message, { theme: 'colored' });
                }
            } else {
                toast.error('Số lượng ảnh upload ít nhất từ 2 ! ', {
                    theme: 'colored',
                });
            }
        },
    });

    function toSlug(str) {
        if (str) document.title = 'Yolo - ' + str;
        else document.title = 'Yolo - Tạo bài viết';
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();
        // xóa dấu
        str = str
            .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
            .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp
        // Thay ký tự đĐ
        str = str.replace(/[đĐ]/g, 'd');
        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');
        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');
        // Xóa ký tự - liên tiếp
        str = str.replace(/-+/g, '-');
        // xóa phần dư - ở đầu & cuối
        str = str.replace(/^-+|-+$/g, '');
        return str;
    }

    return (
        <>
            <Section>
                <SectionTitle>Tạo bài viết</SectionTitle>
                <SectionBody>
                    <div className="post-container__content">
                        <form className="post-container__content__form" onSubmit={formik.handleSubmit}>
                            <div className="input-form">
                                <label htmlFor="title" className="label-title">
                                    Tiêu đề <span className="required">*</span>
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập tiêu đề..."
                                />
                            </div>
                            {formik.errors.title && <p className="required"> {formik.errors.title} </p>}

                            <div className="input-form">
                                <label htmlFor="content" className="label-title">
                                    Nội dung bài viết <span className="required">*</span>
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    rows="10"
                                    value={formik.values.content}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập nội dung bài viết ..."
                                />
                            </div>
                            {formik.errors.content && <p className="required"> {formik.errors.content} </p>}

                            <div className="input-form">
                                <label htmlFor="price" className="label-title">
                                    Giá cả <span className="required">*</span>
                                </label>
                                <input
                                    id="price"
                                    type="text"
                                    name="pricePerMonth"
                                    value={formik.values.pricePerMonth}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập giá ..."
                                />
                            </div>
                            {formik.errors.pricePerMonth && <p className="required"> {formik.errors.pricePerMonth} </p>}

                            <div className="input-form">
                                <label htmlFor="address" className="label-title">
                                    Địa chỉ <span className="required">*</span>
                                </label>
                                <input
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập địa chỉ ..."
                                />
                            </div>
                            {formik.errors.address && <p className="required"> {formik.errors.address} </p>}

                            <div className="input-form">
                                <label htmlFor="file" className="label-title">
                                    Upload files <span className="required">*</span>
                                </label>
                                <input
                                    id="files"
                                    type="file"
                                    name="files"
                                    multiple="multiple"
                                    // value={formik.values.files}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.files && <p className="required"> {formik.errors.files} </p>}

                            <input type="submit" className="form-submit__btn" value="Đăng bài viết" />
                        </form>
                    </div>
                </SectionBody>
            </Section>
        </>
    );
};

export default PostCreate;
