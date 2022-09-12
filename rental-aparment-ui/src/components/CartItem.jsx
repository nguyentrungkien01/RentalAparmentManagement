import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { removeItem, updateItem } from '../redux/shopping-cart/cartItemsSlide';

import numberWithCommas from '../utils/numberWithCommas';
import { Link } from 'react-router-dom';

const CartItem = (props) => {
    const dispatch = useDispatch();

    const itemRef = useRef(null);
    const [item, setItem] = useState(props.item);
    const [quantity, setQuantity] = useState(props.quantity);

    useEffect(() => {
        setItem(props.item);
        setQuantity(props.quantity);
    }, [props.item, props.quantity]);

    const updateQuantity = (opt) => {
        if (opt === '+') {
            dispatch(updateItem({ ...item, quantity: quantity + 1 }));
        }
        if (opt === '-') {
            dispatch(updateItem({ ...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1 }));
        }
    };
    // const updateCartItem = () => {
    //     dispatch(updateItem({...item, quantity: quantity}))
    // }

    const removeCartItem = () => {
        dispatch(removeItem(item));
    };

    return (
        <div className="cart__item" ref={itemRef}>
            <div className="cart__item__image">
                <img src={item.product.image[0].path} alt="" />
            </div>
            <div className="cart__item__info">
                <div className="cart__item__info__name">
                    <Link
                        to={`/nha-tro/${item.slug}`}
                    >{`${item.product.title} - Địa chỉ: ${item.product.address}`}</Link>
                </div>
                <div className="cart__item__info__price">Giá: {numberWithCommas(item.product.pricePerMonth)} vnđ</div>
                <div className="cart__item__info__quantity">
                    Số tháng thuê:
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('-')}>
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product__info__item__quantity__input">{quantity}</div>
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('+')}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>
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
