import React from 'react';

import Helmet from '../components/Helmet';
import contactImg from '../assets/images/contact/contact.png';
import Grid from '../components/Grid';

const Contact = () => {
    return (
        <Helmet title="Liên hệ">
            <div className="contact-bg">
                <h3>Liên hệ với chúng tôi</h3>
                <h2>contact us</h2>
                <div className="contact-bg__line">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p className="contact-bg__text">
                    Hỗ trợ giải đáp thắc mắc, tư vấn tìm trọ 1 cách nhanh chóng với giá cả phải chăng. Cảm ơn bạn đã tin
                    tưởng YOLO !
                </p>
            </div>
            <div className="contact-info">
                <Grid col={4} mdCol={2} smCol={2} gap={10}>
                    <div>
                        <span>
                            <i className="bx bxs-phone-call"></i>
                        </span>
                        <span>Số điện thoại</span>
                        <span className="contact-info__text">1-2392-23928-2</span>
                    </div>
                    <div>
                        <span>
                            <i className="bx bx-envelope"></i>
                        </span>
                        <span>E-mail</span>
                        <span className="contact-info__text">mail@company.com</span>
                    </div>
                    <div>
                        <span>
                            <i className="bx bxs-map"></i>
                        </span>
                        <span>Địa chỉ</span>
                        <span className="contact-info__text">371 Nguyễn Kiệm, Q.Gò Vấp</span>
                    </div>
                    <div>
                        <span>
                            <i className="bx bx-time-five"></i>
                        </span>
                        <span>Giờ hoạt động</span>
                        <span className="contact-info__text">Cả tuần (8:00 đến 17:00)</span>
                    </div>
                </Grid>
            </div>

            <div className="contact-form">
                <Grid col={2} smCol={1}>
                    <form>
                        <div>
                            <input type="text" className="form-control" placeholder="Họ và tên lót..." />
                            <input type="text" className="form-control" placeholder="Tên..." />
                        </div>
                        <div>
                            <input type="email" className="form-control" placeholder="E-mail" />
                            <input type="text" className="form-control" placeholder="Số điện thoại..." />
                        </div>
                        <textarea rows="5" placeholder="Lời nhắn..." className="form-control"></textarea>
                        <input type="submit" className="send-btn" value="Gửi tin nhắn" />
                    </form>

                    <div>
                        <img src={contactImg} alt="contact" />
                    </div>
                </Grid>
            </div>
        </Helmet>
    );
};

export default Contact;
