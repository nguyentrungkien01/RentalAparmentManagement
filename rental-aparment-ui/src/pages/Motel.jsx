import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Helmet from '../components/Helmet';
import Section, { SectionBody, SectionTitle } from '../components/Section';
import Grid from '../components/Grid';
import MotelCard from '../components/MotelCard';
import MotelView from '../components/MotelView';

import productData from '../fake-data/products';

const Motel = () => {
    const slug = useParams();
    const product = productData.getProductBySlug(slug.slug);

    const relatedProduct = productData.getProducts(8);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    return (
        <Helmet title={product.title}>
            <Section>
                <SectionBody>
                    <MotelView product={product} />
                </SectionBody>
            </Section>

            <Section>
                <SectionTitle>Khám phá thêm</SectionTitle>
                <SectionBody>
                    <Grid col={4} gap={20} mdCol={2} smCol={1}>
                        {relatedProduct.map((item, index) => (
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
        </Helmet>
    );
};

export default Motel;
