import React from 'react';

const CommentItem = () => {
    return (
        <div className="comment-item">
            <div className="comment-wrapper">
                <div className="comment-wrapper__img">
                    <img src="https://via.placeholder.com/128/fe669e/ffcbde.png?text=S" alt="user img" />
                </div>
                <div className="comment-wrapper__info">
                    <div className="comment-wrapper__info-header">
                        <p>
                            <b>Username</b>
                            <span>2 ngày trước</span>
                        </p>
                    </div>
                    <div className="comment-wrapper__info-content">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi unde excepturi voluptates officia
                        animi. Natus impedit laboriosam, consequatur quasi, saepe dolorem, doloribus odit sint porro at
                        veniam quia alias amet.
                    </div>
                    <div className="comment-wrapper__info-react">
                        <i className="bx bx-like">55</i>
                        <i className="bx bx-dislike">1</i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentItem;
