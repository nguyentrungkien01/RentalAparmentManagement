import React, { useState } from 'react';

import ratingApi from '../api/ratingApi';
import { toast } from 'react-toastify';
import { useRef } from 'react';

const Star = (ratingInfo) => {
    const [rating, setRating] = useState(ratingInfo.rating.rateAmount);
    const [hover, setHover] = useState(null);
    const token = localStorage.getItem('token');
    const phoneNumber = localStorage.getItem('phoneNumber');

    const refAmount = useRef(null);
    let handleComment = async () => {
        if (token) {
            try {
                const params = {
                    postId: ratingInfo.postId,
                    rateAmount: refAmount.current,
                    phoneNumber: phoneNumber,
                };
                const response = await ratingApi.postRating(params, token);

                if (response.code === 200) {
                    setRating(refAmount.current);
                    toast.success('Rating thành công !', { theme: 'colored' });
                } else {
                    toast.error('Không thể rating 2 lần. Rating thất bại !', { theme: 'colored' });
                }
            } catch (error) {
                console.log('Thất bại khi gửi dữ liệu: ', error.message);
                toast.error('Thất bại khi gửi dữ liệu', { theme: 'colored' });
            }
        } else {
            toast.error('Bạn cần đăng nhập để sử dụng tính năng này', { theme: 'colored' });
        }
    };

    return (
        <div className="star-container">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={i}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => {
                                refAmount.current = ratingValue;
                                handleComment();
                            }}
                        />
                        <i
                            className={`bx bxs-star ${ratingValue <= (rating || hover) ? 'star-yellow' : 'star-gray'}`}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        ></i>
                    </label>
                );
            })}
            <p className="star-desc">
                {rating !== undefined ? `Bạn đã đánh giá ${rating} sao` : 'Bạn chưa đánh giá bài viết này'}
            </p>
        </div>
    );
};

export default Star;
