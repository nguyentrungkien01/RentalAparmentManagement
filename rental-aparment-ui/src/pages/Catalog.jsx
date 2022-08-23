import React, { useState } from 'react';
import Helmet from '../components/Helmet';
import CheckBox from '../components/CheckBox';
import InfinityList from '../components/InfinityList';

import productData from '../fake-data/products';
import category from '../fake-data/category';
import price from '../fake-data/product-price';

import Button from '../components/Button';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const Homestay = () => {
    const initFilter = {
        category: [],
        price: [],
    };

    const productList = productData.getAllProducts();

    const [products, setProducts] = useState(productList);

    const [filter, setFilter] = useState(initFilter);

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case 'CATEGORY':
                    setFilter({ ...filter, category: [...filter.category, item.categorySlug] });
                    break;
                case 'PRICE':
                    setFilter({ ...filter, price: [...filter.price, item.price] });
                    break;

                default:
            }
        } else {
            switch (type) {
                case 'CATEGORY':
                    const newCategory = filter.category.filter((e) => e !== item.categorySlug);
                    setFilter({ ...filter, category: newCategory });
                    break;
                case 'PRICE':
                    const newPrice = filter.price.filter((e) => e !== item.price);
                    setFilter({ ...filter, price: newPrice });
                    break;
                default:
            }
        }
    };

    const clearFilter = () => setFilter(initFilter);

    const updateProducts = useCallback(() => {
        let temp = productList;

        if (filter.category.length > 0) {
            temp = temp.filter((e) => filter.category.includes(e.categorySlug));
        }

        if (filter.price.length > 0) {
            temp = temp.filter((e) => filter.price.includes(e.price));
        }

        setProducts(temp);
    }, [filter, productList]);

    useEffect(() => {
        updateProducts();
    }, [updateProducts]);

    const filterRef = useRef(null);

    const showHideFilter = () => filterRef.current.classList.toggle('active');

    return (
        <Helmet title="Nhà trọ">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">Địa điểm</div>
                        <div className="catalog__filter__widget__content">
                            {category.map((item, index) => (
                                <div className="catalog__filter__widget__content__item" key={index}>
                                    <CheckBox
                                        label={item.display}
                                        onChange={(input) => filterSelect('CATEGORY', input.checked, item)}
                                        checked={filter.category.includes(item.categorySlug)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">Giá tiền</div>
                        <div className="catalog__filter__widget__content">
                            {price.map((item, index) => (
                                <div className="catalog__filter__widget__content__item" key={index}>
                                    <CheckBox
                                        label={item.display}
                                        onChange={(input) => filterSelect('PRICE', input.checked, item)}
                                        checked={filter.price.includes(item.price)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onClick={clearFilter}>
                                Xoá bộ lọc
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>
                        Bộ lọc
                    </Button>
                </div>
                <div className="catalog__content">
                    <InfinityList data={products} />
                </div>
            </div>
        </Helmet>
    );
};

export default Homestay;
