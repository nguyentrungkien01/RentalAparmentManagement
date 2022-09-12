import React from 'react';
import user_image from '../assets/images/user.png';

const CommentItem = (comment) => {
    return (
        <div className="comment-item">
            <div className="comment-wrapper">
                <div className="comment-wrapper__img">
                    <img src={user_image} alt="user img" />
                </div>
                <div className="comment-wrapper__info">
                    <div className="comment-wrapper__info-header">
                        <p>
                            <b>{`${comment.data.account.lastName} ${comment.data.account.firstName}`}</b>
                            <span>{new Date(comment.data.dateCreated).toLocaleString('vi-VI')}</span>
                        </p>
                    </div>
                    <div className="comment-wrapper__info-content">{comment.data.content}</div>
                </div>
            </div>
        </div>
    );
};

export default CommentItem;
