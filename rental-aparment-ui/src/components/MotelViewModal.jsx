import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import MoteltView from './MotelView';
import Button from './Button';

import { remove } from '../redux/product-modal/productModalSlice';

import productData from '../fake-data/products';

const MotelViewModal = () => {
    const productSlug = useSelector((state) => state.productModal.value);

    const dispath = useDispatch();

    const [product, setProduct] = useState(undefined);

    // const product = productData.getProductBySlug('ao-somi-caro-07');

    useEffect(() => {
        setProduct(productData.getProductBySlug(productSlug));
    }, [productSlug]);

    return (
        <div className={`product-view__modal ${product === undefined ? '' : 'active'}`}>
            <div className="product-view__modal__content">
                {<MoteltView product={product} />}
                <div className="product-view__modal__content__close">
                    <Button size="sm" onClick={() => dispath(remove())}>
                        Đóng
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MotelViewModal;
