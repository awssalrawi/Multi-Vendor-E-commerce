import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import "./styles/productImagesSlider.scss";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination } from "swiper";
const ProductImagesSlider = (props) => {
  const [activeThumb, setActiveThumb] = useState();
  return (
    <Fragment>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs, Pagination]}
        pagination={{ clickable: true }}
        grabCursor={true}
        thumbs={{ swiper: activeThumb }}
        className="product-images-slider"
      >
        {props.images.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item} alt="product images" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        modules={[Navigation, Thumbs]}
        className="product-images-slider-thumbs"
      >
        {props.images.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="product-images-slider-thumbs-wrapper">
              <img src={item} alt="product images" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Fragment>
  );
};
ProductImagesSlider.propTypes = {
  images: PropTypes.array.isRequired,
};
export default ProductImagesSlider;
