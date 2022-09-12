import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Helmet from '../components/Helmet';
import Button from '../components/Button';
import CartItem from '../components/CartItem';
import { Link, useParams } from 'react-router-dom';

import numberWithCommas from '../utils/numberWithCommas';
import postApi from '../api/postApi';

import { toast } from 'react-toastify';
import paymentApi from '../api/paymentApi';
import accountApi from '../api/accountApi';
import { removeItem } from '../redux/shopping-cart/cartItemsSlide';

const Cart = () => {
    const token = localStorage.getItem('token');
    const accountRole = localStorage.getItem('role');

    const cartItems = useSelector((state) => state.cartItems.value);
    const [motelList, setMotelList] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const p = useParams();
    const dispatch = useDispatch();
    var listProduct = [];

    useEffect(() => {
        const fetchMotelList = async () => {
            try {
                const response = await postApi.getAll();

                if (response.code !== 200) {
                    throw new Error(response.message);
                } else {
                    setMotelList(response.data);
                }
            } catch (error) {
                console.log('Thất bại khi lấy danh sách bài viêt: ', error);
            }
        };

        const fetchAccount = async () => {
            try {
                const response = await accountApi.getUserDetail(token);
                if (response.code === 200) {
                    setUserInfo(response.data);
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                toast.error('Thất bại khi lấy thông tin tài khoản ! ' + error.message, { theme: 'colored' });
                console.log('Thất bại khi lấy thông tin tài khoản: ', error);
            }
        };

        fetchAccount();
        fetchMotelList();
    }, [token]);

    const getProductBySlug = (slug) => motelList.find((e) => e.slug === slug);

    const getCartItemsInfo = (cartItems) => {
        let res = [];
        if (cartItems.length > 0) {
            cartItems.forEach((e) => {
                let product = getProductBySlug(e.slug);
                res.push({
                    ...e,
                    product: product,
                });
            });
        }
        return res.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    };

    if (motelList != null) {
        listProduct = getCartItemsInfo(cartItems);
        var total = cartItems.reduce((total, item) => total + Number(item.quantity) * Number(item.pricePerMonth), 0);
    }

    const items = [];
    cartItems.forEach((e) => {
        items.push({ id: e.id, name: e.name, price: e.pricePerMonth });
    });

    let handlePayment = async () => {
        try {
            const params = {
                totalMoney: total,
                orderInfo: 'thanh toan nha tro',
                notifyUrl: 'http://localhost:3000/gio-hang',
                returnUrl: 'http://localhost:3000/gio-hang',
                items: items,
                userInfo: {
                    name: userInfo.firstName + userInfo.lastName,
                    phoneNumber: userInfo.phoneNumber,
                    email: userInfo.email,
                },
            };
            const response = await paymentApi.postMomo(params, token);
            if (response.code === 200) {
                toast.success('Bắt đầu thanh toán !', { theme: 'colored' });
                window.location.href = response.data.payUrl;
            } else {
                console.log(response);

                toast.error('Thanh toán thất bại !', { theme: 'colored' });
            }
        } catch (error) {
            console.log('Thất bại khi gửi dữ liệu: ', error.message);
            toast.error('Thất bại khi gửi dữ liệu', { theme: 'colored' });
        }
    };

    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        const resultCode = params.get('resultCode');
        if (resultCode != null) {
            if (parseInt(resultCode) === 1004) {
                toast.warning('Đặt hàng thất bại do số tiền thanh toán vượt quá hạn mức thanh toán của bạn', {
                    theme: 'colored',
                });
            } else if (parseInt(resultCode) === 1005) {
                toast.warning('Đặt hàng thất bại do url hoặc QR code đã hết hạn', { theme: 'colored' });
            } else if (parseInt(resultCode) === 1006) {
                toast.warning('Đặt hàng thất bại do bạn đã huỷ giao dịch', { theme: 'colored' });
            } else if (parseInt(resultCode) !== 0) {
                toast.warning('Đặt hàng thất bại do lỗi hệ thống', { theme: 'colored' });
            } else if (parseInt(resultCode) === 0) {
                toast.success('Thanh toán thành công !', { theme: 'colored' });
                cartItems.forEach((item, index) => {
                    dispatch(removeItem(item));
                });
                window.location.href = 'http://localhost:3000/gio-hang';
            } else {
                toast.error('Thanh toán thất bại', { theme: 'colored' });
            }
        }
    }, [p.slug]);

    return (
        <Helmet title="Giỏ hàng">
            {motelList ? (
                <div className="cart">
                    <div className="cart__list">
                        {listProduct.map((item, index) => (
                            <CartItem key={index} item={item} quantity={item.quantity} />
                        ))}
                    </div>
                    <div className="cart__info">
                        <div className="cart__info__txt">
                            <p>Bạn đang có {cartItems.length} nhà trọ trong giỏ hàng</p>
                            <div className="cart__info__txt__price">
                                <span>
                                    Thành tiền: <span>{numberWithCommas(total)} vnđ</span>
                                </span>
                            </div>
                        </div>
                        <div className="cart__info__btn">
                            {accountRole === 'user' ? (
                                <Button size="block" onClick={handlePayment}>
                                    Thanh toán momo
                                </Button>
                            ) : (
                                <p className="cart__info__txt__warning">Bạn cần đăng nhập để thanh toán !</p>
                            )}
                            <Link to="/nha-tro">
                                <Button size="block">Tiếp tục tham khảo</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </Helmet>
    );
};

export default Cart;
