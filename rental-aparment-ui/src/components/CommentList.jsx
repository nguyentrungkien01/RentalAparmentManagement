import React from 'react';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import Star from '../components/Star';

const CommentList = (props) => {
    return (
        <div className="comment-container">
            <Star />
            <CommentInput />
            {props.data.map((item, index) => (
                <CommentItem key={index} />
            ))}
        </div>
    );
};

export default CommentList;
