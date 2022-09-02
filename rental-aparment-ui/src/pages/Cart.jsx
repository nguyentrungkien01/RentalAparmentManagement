import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import productData from '../fake-data/products';

import Helmet from '../components/Helmet';
import Button from '../components/Button';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';

import numberWithCommas from '../utils/numberWithCommas';

import { toast } from 'react-toastify';

const Cart = () => {
    const cartItems = useSelector((state) => state.cartItems.value);

    const [cartProducts, setCartProducts] = useState(productData.getCartItemsInfo(cartItems));

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setCartProducts(productData.getCartItemsInfo(cartItems));
        setTotalPrice(cartItems.reduce((total, item) => total + Number(item.price), 0));
    }, [cartItems]);

    // api account info
    const accountRole = localStorage.getItem('role');
    
    return (
        <Helmet title="Giỏ hàng">
            <div className="cart">
                <div className="cart__list">
                    {cartProducts.map((item, index) => (
                        <CartItem key={index} item={item} />
                    ))}
                </div>
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>Bạn đang có {cartItems.length} nhà trọ trong giỏ hàng</p>
                        <div className="cart__info__txt__price">
                            <span>
                                Thành tiền: <span>{numberWithCommas(totalPrice)} vnđ</span>
                            </span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        {accountRole === 'user' ? (
                            <Button size="block">Thanh toán momo</Button>
                        ) : (
                            <p className="cart__info__txt__warning">Bạn cần đăng nhập để thanh toán !</p>
                        )}
                        <Link to="/nha-tro">
                            <Button size="block">Tiếp tục tham khảo</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Cart;
