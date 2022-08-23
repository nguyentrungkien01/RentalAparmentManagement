import React from 'react';
import Helmet from '../components/Helmet';
import Grid from '../components/Grid';
import Section, { SectionBody, SectionTitle } from '../components/Section';
import { Link } from 'react-router-dom';
import PolicyCard from '../components/PolicyCard';
import policy from '../fake-data/policy';

const Policy = () => {
    return (
        <Helmet title="Chính sách">
            <div className="contact-bg">
                <h3>Chính sách</h3>
                <h2>Policy</h2>
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
            <Section>
                <SectionTitle>Chính sách</SectionTitle>
                <SectionBody>
                    <Grid col={4} gap={20} mdCol={2} smCol={1}>
                        {policy.map((item, index) => (
                            <Link to="/chinh-sach" key={index}>
                                <PolicyCard name={item.name} description={item.description} icon={item.icon} />
                            </Link>
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    );
};

export default Policy;
