import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';



const LocationCard = (props) => {
    return (
        <div className="location-card">
            <Link to="/dia-diem">
                <img src={props.images} alt={props.name} className="location-card__img" />
                <div className="location-card__content">
                    <h3 className="location-card__content-title">{props.name}</h3>
                    <div className="location-card__content-price">
                        <b>{props.amount}</b>
                        <span> Chỗ ở</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

LocationCard.propTypes = {
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    images: PropTypes.string.isRequired,
};

export default LocationCard;
