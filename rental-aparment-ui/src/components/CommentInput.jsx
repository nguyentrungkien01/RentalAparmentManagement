import React from 'react';
import Button from '../components/Button';

const CommentInput = () => {
    return (
        <div className="comment-input">
            <textarea rows="5" placeholder="Bình luận tại đây ..."></textarea>
            <div className="comment-input__action">
                <Button size="sm">Bình luận</Button>
            </div>
        </div>
    );
};

export default CommentInput;
