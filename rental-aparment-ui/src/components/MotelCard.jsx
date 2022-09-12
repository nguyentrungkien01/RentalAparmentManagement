import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Button from './Button';

import numberWithCommas from '../utils/numberWithCommas';

const MotelCard = (props) => {
    return (
        <div className="product-card">
            <Link to={`/nha-tro/${props.slug}`}>
                <div className="product-card__image">
                    <img src={props.img01} alt="" />
                    <img src={props.img02} alt="" />
                </div>
                <h3 className="product-card__name">{props.name}</h3>
                <div className="product-card__price">{numberWithCommas(props.price)} vnđ</div>
            </Link>
            <div className="product-card__btn">
                <Link to={`/nha-tro/${props.slug}`}>
                    <Button size="sm" icon="bx bx-cart">
                        Thuê phòng
                    </Button>
                </Link>
            </div>
        </div>
    );
};

MotelCard.propTypes = {
    id: PropTypes.number,
    img01: PropTypes.string,
    img02: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
    price: PropTypes.number,
    slug: PropTypes.string,
};

export default MotelCard;
