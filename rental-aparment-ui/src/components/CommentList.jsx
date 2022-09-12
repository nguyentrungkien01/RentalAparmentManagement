import React from 'react';
import CommentItem from './CommentItem';
import Star from '../components/Star';

const CommentList = (props) => {
    const phoneNumber = localStorage.getItem('phoneNumber');
    const ratingInfo = props.rating.find((r) => r.account.phoneNumber === phoneNumber);


    return (
        <div className="comment-container">
            <Star rating={ratingInfo !== undefined ? ratingInfo : 0} postId={props.postId} />
            {props.data.slice(0).reverse().map((item, index) => (
                <CommentItem key={index} data={item} />
            ))}
        </div>
    );
};

export default CommentList;
