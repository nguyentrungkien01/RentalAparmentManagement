import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { removeItem } from '../redux/shopping-cart/cartItemsSlide';

import numberWithCommas from '../utils/numberWithCommas';
import { Link } from 'react-router-dom';

const CartItem = (props) => {
    const dispatch = useDispatch();

    const itemRef = useRef(null);

    const [item, setItem] = useState(props.item);

    useEffect(() => {
        setItem(props.item);
    }, [props.item]);

    // const updateCartItem = () => {
    //     dispatch(updateItem({...item, quantity: quantity}))
    // }

    const removeCartItem = () => {
        dispatch(removeItem(item));
    };

    return (
        <div className="cart__item" ref={itemRef}>
            <div className="cart__item__image">
                <img src={item.product.image01} alt="" />
            </div>
            <div className="cart__item__info">
                <div className="cart__item__info__name">
                    <Link
                        to={`/nha-tro/${item.slug}`}
                    >{`${item.product.title} - Địa chỉ: ${item.product.address}`}</Link>
                </div>
                <div className="cart__item__info__price">Giá: {numberWithCommas(item.price)} vnđ</div>
                <div className="cart__item__del">
                    <i className="bx bx-trash" onClick={() => removeCartItem()}></i>
                </div>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.object,
};

export default CartItem;
