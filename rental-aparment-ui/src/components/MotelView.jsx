import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { remove } from '../redux/product-modal/productModalSlice';
import { addItem } from '../redux/shopping-cart/cartItemsSlide';

import Button from './Button';
import numberWithCommas from '../utils/numberWithCommas';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import likeApi from '../api/likeApi';

const MotelView = (props) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    const [previewImg, setPreviewImg] = useState(props.img01);

    const [descriptionExpand, setDescriptionExpand] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setPreviewImg(props.img01);
        setQuantity(1);
    }, [props]);

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
        }
    };

    let checkLiked = true;
    const handleLike = async () => {
        if (token) {
            if (checkLiked) {
                try {
                    const params = {
                        PostId: props.postId,
                        Flag: 1,
                    };
                    const response = await likeApi.postUpdateLike(params, token);
                    if (response.code === 200) {
                        toast.success('Like thành công !', { theme: 'colored' });
                        checkLiked = false;
                        document.getElementById('like').innerHTML = `Lượt thích: ${response.data}`;
                    } else {
                        toast.error('Lỗi!', { theme: 'colored' });
                    }
                } catch (error) {
                    console.log('Thất bại khi gửi dữ liệu: ', error.message);
                    toast.error('Thất bại khi gửi dữ liệu', { theme: 'colored' });
                }
            } else {
                toast.error('Đã like!', { theme: 'colored' });
            }
        } else {
            toast.error('Bạn cần đăng nhập để được phép thích bài viết !', { theme: 'colored' });
        }
    };

    function GoToCart() {
        let navigate = useNavigate();

        const routeChange = async () => {
            if (token) {
                if (
                    dispatch(
                        addItem({
                            id: props.postId,
                            name: props.name,
                            slug: props.slug,
                            pricePerMonth: props.pricePerMonth,
                            address: props.address,
                            quantity: quantity,
                        }),
                    )
                ) {
                    dispatch(remove());
                    toast.success('Đặt thành công !', { theme: 'colored' });
                    let path = `/gio-hang`;
                    navigate(path);
                }
            } else {
                toast.error('Bạn cần đăng nhập để được phép đặt phòng !', { theme: 'colored' });
            }
        };

        return (
            <Button onClick={routeChange} size="sm">
                Đặt phòng
            </Button>
        );
    }

    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    <div className="product__images__list__item">
                        <img src={props.img01} alt={props.title} onClick={() => setPreviewImg(props.img01)} />
                    </div>
                    <div className="product__images__list__item">
                        <img src={props.img02} alt={props.title} onClick={() => setPreviewImg(props.img02)} />
                    </div>
                </div>
                <div className="product__images__main">
                    <img src={previewImg} alt={props.title} />
                </div>
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">Chi tiết nhà trọ</div>
                    <div
                        className="product-description__content"
                        dangerouslySetInnerHTML={{ __html: props.content }}
                    ></div>
                    <div className="product-description__toggle">
                        <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {descriptionExpand ? 'Thu gọn' : 'Xem thêm'}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">{props.title}</h1>
                <div className="product__info__item">
                    <span className="product__info__item__price">
                        {numberWithCommas(Number.parseInt(props.pricePerMonth))} vnđ
                    </span>
                    <p className="product__info__item__address">Địa chỉ: {props.address}</p>
                    {props.likeAmount ? (
                        <>
                            <p className="product__info__item__address" id="like">
                                Lượt thích: {props.likeAmount}
                            </p>
                        </>
                    ) : (
                        <p className="product__info__item__address" id="like">
                            Lượt thích: 0
                        </p>
                    )}
                    <Button size="sm" onClick={() => handleLike()}>
                        👍 Thích
                    </Button>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">Số tháng thuê</div>
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('minus')}>
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product__info__item__quantity__input">{quantity}</div>
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('plus')}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="product__info__item">{GoToCart()}</div>
                <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">Chi tiết nhà trọ</div>
                    <div
                        className="product-description__content"
                        dangerouslySetInnerHTML={{ __html: props.content }}
                    ></div>
                    <div className="product-description__toggle">
                        <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {descriptionExpand ? 'Thu gọn' : 'Xem thêm'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
MotelView.propTypes = {
    img01: PropTypes.string,
    img02: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
    pricePerMonth: PropTypes.number,
    slug: PropTypes.string,
    content: PropTypes.string,
    likeAmount: PropTypes.number,
    postId: PropTypes.number,
};
export default MotelView;
