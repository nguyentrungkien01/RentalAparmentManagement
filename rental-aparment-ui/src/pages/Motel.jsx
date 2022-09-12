import React, { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';

import Helmet from '../components/Helmet';
import Section, { SectionBody, SectionTitle } from '../components/Section';
import Grid from '../components/Grid';
import MotelCard from '../components/MotelCard';
import MotelView from '../components/MotelView';
import CommentList from '../components/CommentList';

import postApi from '../api/postApi';
import Button from '../components/Button';
import commentApi from '../api/commentApi';
import { toast } from 'react-toastify';

const Motel = () => {
    const slug = useParams();

    const [motel, setMotel] = useState(null);
    const [motelList, setMotelList] = useState([]);
    const phoneNumber = localStorage.getItem('phoneNumber');
    const token = localStorage.getItem('token');
    const [updateValue, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        const fetchMotelList = async () => {
            try {
                const response = await postApi.getAll();

                if (response.code !== 200) {
                    throw new Error(response.message);
                } else {
                    setMotelList(response.data);
                    response.data.map(async (motel) => {
                        if (motel.slug === slug.slug) {
                            const response1 = await postApi.viewDetails(motel.id);
                            setMotel(response1.data);
                        }
                    });
                }
            } catch (error) {
                console.log('Thất bại khi lấy danh sách bài viêt: ', error);
            }
        };

        fetchMotelList();
    }, [updateValue, slug.slug]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug.slug]);

    let handleComment = async () => {
        if (token) {
            const content = document.querySelector('textarea');
            try {
                const params = {
                    content: content.value,
                    postId: motel.id,
                    phoneNumber: phoneNumber,
                };
                const response = await commentApi.post(params, token);
                if (response.code === 200) {
                    toast.success('Comment thành công !', { theme: 'colored' });
                    content.value = '';
                    forceUpdate();
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
        <Helmet title={`${motel ? motel.title : 'Nhà trọ'}`}>
            {motel ? (
                <>
                    <Section>
                        <SectionBody>
                            <MotelView
                                img01={motel.image[0].path}
                                img02={motel.image[1].path}
                                name={motel.title}
                                pricePerMonth={Number(motel.pricePerMonth)}
                                slug={motel.slug}
                                title={motel.title}
                                address={motel.address}
                                content={motel.content}
                                likeAmount={motel.likeAmount}
                                postId={motel.id}
                            />
                        </SectionBody>
                    </Section>
                    <Section>
                        <div className="comment-container">
                            <div className="comment-input">
                                <textarea rows="5" placeholder="Bình luận tại đây ..."></textarea>
                                <div className="comment-input__action">
                                    <Button size="sm" onClick={() => handleComment()}>
                                        Bình luận
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <CommentList data={motel.comment} rating={motel.rating} postId={motel.id} />
                    </Section>
                    <Section>
                        <SectionTitle>Khám phá thêm</SectionTitle>
                        <SectionBody>
                            <Grid col={4} gap={20} mdCol={2} smCol={1}>
                                {motelList.map((item, index) => {
                                    if (index < 8)
                                        return (
                                            <MotelCard
                                                key={index}
                                                img01={item.image[0].path}
                                                img02={item.image[1].path}
                                                name={item.title}
                                                price={Number(item.pricePerMonth)}
                                                slug={item.slug}
                                            />
                                        );
                                    return null;
                                })}
                            </Grid>
                        </SectionBody>
                    </Section>
                </>
            ) : (
                <></>
            )}
        </Helmet>
    );
};

export default Motel;
