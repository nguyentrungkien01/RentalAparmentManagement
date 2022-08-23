import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { set } from '../redux/product-modal/productModalSlice';

import Button from './Button';

import numberWithCommas from '../utils/numberWithCommas';

const MotelCard = (props) => {
    const dispatch = useDispatch();
    
    return (
        <div className="product-card">
            <Link to={`/nha-tro/${props.slug}`}>
                <div className="product-card__image">
                    <img src={props.img01} alt="" />
                    <img src={props.img02} alt="" />
                </div>
                <h3 className="product-card__name">{props.name}</h3>
                <div className="product-card__price">
                    {numberWithCommas(props.price)} vnđ
                    {props.old_price !== 0 ? (
                        <span className="product-card__price__old">
                            <del>{numberWithCommas(props.old_price)} vnđ</del>
                        </span>
                    ) : (
                        <></>
                    )}
                </div>
            </Link>
            <div className="product-card__btn">
                <Button size="sm" icon="bx bx-cart" animate={true} onClick={() => dispatch(set(props.slug))}>
                    Thuê phòng
                </Button>
            </div>
        </div>
    );
};

MotelCard.propTypes = {
    img01: PropTypes.string.isRequired,
    img02: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    price: PropTypes.number.isRequired,
    old_price: PropTypes.number,
    slug: PropTypes.string.isRequired,
};

export default MotelCard;
