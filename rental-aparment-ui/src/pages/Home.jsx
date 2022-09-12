import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Helmet from '../components/Helmet';
import HeroSlider from '../components/HeroSlider';
import Section, { SectionTitle, SectionBody } from '../components/Section';
import PolicyCard from '../components/PolicyCard';
import MotelCard from '../components/MotelCard';
import LocationCard from '../components/LocationCard';
import Grid from '../components/Grid';

import heroSliderData from '../fake-data/hero-slider';
import policy from '../fake-data/policy';
import locationData from '../fake-data/location';
import bannerData from '../fake-data/banner';

import postApi from '../api/postApi';

const Home = () => {
    const [motelList, setMotelList] = useState([]);

    useEffect(() => {
        const fetchMotelList = async () => {
            try {
                const response = await postApi.getAll();

                if (response.code !== 200) {
                    throw new Error(response.message);
                } else {
                    setMotelList(response.data);
                }
            } catch (error) {
                console.log('Thất bại khi lấy danh sách bài viêt: ', error);
            }
        };

        fetchMotelList();
    }, []);

    var locationSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1240,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    var bannerSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Helmet title="Trang chủ">
            <HeroSlider data={heroSliderData} control auto />
            {/* section policy */}
            <Section>
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
            {/* end section policy */}

            {/* locaiton section */}
            <Section>
                <SectionTitle>Địa điểm</SectionTitle>
                <SectionBody>
                    <Slider {...locationSettings}>
                        {locationData.map((item, index) => (
                            <LocationCard
                                key={index}
                                name={item.name}
                                images={item.images}
                                amount={Number(item.amount)}
                            />
                        ))}
                    </Slider>
                </SectionBody>
            </Section>
            {/* end locaiton section */}

            {/* best selling section */}
            <Section>
                <SectionTitle>Top nhà trọ được quan tâm</SectionTitle>
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
            {/* end best selling section */}

            {/* banner */}
            <Section>
                <SectionBody>
                    <Slider {...bannerSettings}>
                        {bannerData.map((item, index) => (
                            <img src={item.images} alt="" key={index} />
                        ))}
                    </Slider>
                </SectionBody>
            </Section>
            {/* end banner */}

            {/* new home section */}
            <Section>
                <SectionTitle>Nhà trọ mới cập nhật</SectionTitle>
                <SectionBody>
                    <Grid col={4} gap={20} mdCol={2} smCol={1}>
                        {motelList.map((item, index) => {
                            if (index < 4)
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
            {/* end new home section */}
        </Helmet>
    );
};

export default Home;
