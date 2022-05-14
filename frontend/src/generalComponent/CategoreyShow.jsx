import React, { Fragment } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/categoryShowSlider.scss';
import ProductItem from '../component/products/ProductItem';
import CategoryInsideSlider from './CategoryInsideSlider';
import SimpleProductCard from './SimpleProductCard';
const CategoreyShow = () => {
  const settings1 = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    //  autoplay: true,
    focusOnSelect: true,
    mobileFirst: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          dots: true,
          autoplay: false,
        },
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 3,
          dots: true,
          autoplay: false,
        },
      },
      {
        breakpoint: 330,
        settings: {
          slidesToShow: 2,
          dots: true,
          autoplay: false,
        },
      },
      {
        breakpoint: 250,
        settings: 'unslick', // destroys slick
      },
    ],

    // prevArrow: true,
  };
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    //   focusOnSelect: true,
    // mobileFirst: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          infinite: true,
        },
      },

      {
        breakpoint: 628,
        settings: {
          slidesToShow: 3,
          dots: true,
          autoplay: false,
        },
      },
      {
        breakpoint: 330,
        settings: {
          slidesToShow: 2,
          dots: true,
          autoplay: false,
        },
      },
      {
        breakpoint: 250,
        settings: 'unslick', // destroys slick
      },
    ],
    // prevArrow: true,
  };
  const settings3 = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    focusOnSelect: true,
    mobileFirst: true,
    autoplaySpeed: 3000,
    // prevArrow: true,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          dots: true,
          autoplay: false,
        },
      },

      {
        breakpoint: 740,
        settings: {
          slidesToShow: 3,
          dots: true,
          autoplay: false,
        },
      },
      {
        breakpoint: 330,
        settings: {
          slidesToShow: 2,
          dots: true,
          autoplay: false,
        },
      },
      {
        breakpoint: 250,
        settings: 'unslick', // destroys slick
      },
    ],
  };
  return (
    <Fragment>
      <div className="productSliderContainer">
        <Slider {...settings}>
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </Slider>
      </div>
      <hr />
      <div className="categorySlideContainer">
        <Slider {...settings1}>
          <CategoryInsideSlider />
          <CategoryInsideSlider />
          <CategoryInsideSlider />
          <CategoryInsideSlider />
          <CategoryInsideSlider />
          <CategoryInsideSlider />
        </Slider>
      </div>

      <div className="simple-product-container">
        <Slider {...settings3}>
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
        </Slider>
      </div>
    </Fragment>
  );
};

export default CategoreyShow;
