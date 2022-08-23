import React from 'react';
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
import productData from '../fake-data/products';
import locationData from '../fake-data/location';
import bannerData from '../fake-data/banner';

const Home = () => {
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
                        {productData.getProducts(8).map((item, index) => (
                            <MotelCard
                                key={index}
                                img01={item.image01}
                                img02={item.image02}
                                name={item.title}
                                address={item.address}
                                price={Number(item.price)}
                                old_price={Number(item.old_price)}
                                slug={item.slug}
                            />
                        ))}
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
                        {productData.getProducts(8).map((item, index) => (
                            <MotelCard
                                key={index}
                                img01={item.image01}
                                img02={item.image02}
                                name={item.title}
                                address={item.address}
                                price={Number(item.price)}
                                old_price={Number(item.old_price)}
                                slug={item.slug}
                            />
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
            {/* end new home section */}
        </Helmet>
    );
};

export default Home;
