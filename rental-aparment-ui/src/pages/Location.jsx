import React from 'react';
import Grid from '../components/Grid';
import Helmet from '../components/Helmet';
import LocationCard from '../components/LocationCard';
import Section, { SectionBody, SectionTitle } from '../components/Section';

import locationData from '../fake-data/location';

const Location = () => {
    return (
        <Helmet title="Địa điểm">
            <Section>
                <SectionTitle>Địa điểm thuê phòng</SectionTitle>
                <SectionBody>
                    <Grid col={4} gap={20} mdCol={2} smCol={1}>
                        {locationData.map((item, index) => (
                            <LocationCard
                                key={index}
                                name={item.name}
                                images={item.images}
                                amount={Number(item.amount)}
                            />
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    );
};

export default Location;
