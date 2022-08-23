import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { remove } from '../redux/product-modal/productModalSlice';
import { addItem } from '../redux/shopping-cart/cartItemsSlide';

import Button from './Button';
import numberWithCommas from '../utils/numberWithCommas';

import { useNavigate } from 'react-router-dom';

const MotelView = (props) => {
    const dispatch = useDispatch();

    let product = props.product;

    if (product === undefined) {
        product = {
            title: '',
            price: '',
            oldPrice: '',
            image01: null,
            image02: null,
            categorySlug: '',
            slug: '',
            description: '',
        };
    }

    const [previewImg, setPreviewImg] = useState(product.image01);

    const [descriptionExpand, setDescriptionExpand] = useState(false);

    useEffect(() => {
        setPreviewImg(product.image01);
    }, [product]);

    const save = () => {
        dispatch(
            addItem({
                slug: product.slug,
                price: product.price,
                address: product.address,
            }),
        );
        alert('Thêm thành công');
    };

    function GoToCart() {
        let navigate = useNavigate();

        const routeChange = () => {
            dispatch(
                addItem({
                    slug: product.slug,
                    price: product.price,
                    address: product.address,
                }),
            );
            dispatch(remove());
            alert('Thêm thành công');
            let path = `/gio-hang`;
            navigate(path);
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
                        <img src={product.image01} alt={product.title} onClick={() => setPreviewImg(product.image01)} />
                    </div>
                    <div className="product__images__list__item">
                        <img src={product.image02} alt={product.title} onClick={() => setPreviewImg(product.image02)} />
                    </div>
                </div>
                <div className="product__images__main">
                    <img src={previewImg} alt={product.title} />
                </div>
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">Chi tiết nhà trọ</div>
                    <div
                        className="product-description__content"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    ></div>
                    <div className="product-description__toggle">
                        <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {descriptionExpand ? 'Thu gọn' : 'Xem thêm'}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">{product.title}</h1>
                <div className="product__info__item">
                    <span className="product__info__item__price">{numberWithCommas(product.price)}</span>
                    <p className="product__info__item__address">Địa chỉ: {product.address}</p>
                </div>
                <div className="product__info__item">
                    <Button onClick={() => save()} size="sm">
                        Lưu
                    </Button>
                    {GoToCart()}
                </div>
                <div className="product__info__item">
                    <Button size="sm">Chỉ đường</Button>
                </div>
                <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">Chi tiết nhà trọ</div>
                    <div
                        className="product-description__content"
                        dangerouslySetInnerHTML={{ __html: product.description }}
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
    product: PropTypes.object,
};

export default MotelView;
