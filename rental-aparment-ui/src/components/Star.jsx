import React, { useState } from 'react';

const Star = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div className="star-container">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={i}>
                        <input type="radio" name="rating" value={ratingValue} onClick={() => setRating(ratingValue)} />
                        <i
                            className={`bx bxs-star ${ratingValue <= (rating || hover) ? 'star-yellow' : 'star-gray'}`}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        ></i>
                    </label>
                );
            })}
            <p className="star-desc">
                {rating !== null ? `Bạn đã đánh giá ${rating} sao` : 'Bạn chưa đánh giá bài viết này'}
            </p>
        </div>
    );
};

export default Star;
