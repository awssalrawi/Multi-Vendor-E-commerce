import React, { Fragment, useState, useEffect } from 'react';
import './styles/home.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Product from '../products/Product';
import PhoneHeaderHome from './../layout/PhoneHeaderHome';
import CategoryInsideSlider from '../../generalComponent/CategoryInsideSlider';
import { Link } from 'react-router-dom';
import SimpleProductCard from '../../generalComponent/SimpleProductCard';
import CategoryHeader from './CategoryHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../redux/actions/productAction';
import store from '../../redux/store';
import { send } from '../utilis/push.js';
import Footer from './Footer';

const settings1 = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  // autoplay: true,
  focusOnSelect: true,
  mobileFirst: true,
  autoplaySpeed: 3000,
  arrows: true,
  responsive: [
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 4,
        arrows: false,
        autoplay: true,
      },
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 3,
        arrows: false,
        autoplay: true,
      },
    },
    {
      breakpoint: 330,
      settings: {
        slidesToShow: 2,
        arrows: false,
        autoplay: true,
      },
    },
    {
      breakpoint: 250,
      settings: 'unslick', // destroys slick
    },
  ],

  // prevArrow: true,
};
const featureSetting = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  focusOnSelect: true,
  mobileFirst: true,
  autoplaySpeed: 3000,
  arrows: true,

  // prevArrow: true,
};
const simpleProd = {
  dots: false,
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  focusOnSelect: true,
  mobileFirst: true,
  autoplaySpeed: 3000,
  arrows: true,
  responsive: [
    {
      breakpoint: 1028,
      settings: {
        slidesToShow: 5,

        autoplay: true,
      },
    },
    {
      breakpoint: 620,
      settings: {
        slidesToShow: 4,

        autoplay: true,
      },
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 3,

        autoplay: true,
      },
    },
    {
      breakpoint: 330,
      settings: {
        slidesToShow: 2,

        autoplay: true,
      },
    },
    {
      breakpoint: 250,
      settings: 'unslick', // destroys slick
    },
  ],

  // prevArrow: true,
};

const Home = () => {
  let skip = 1;
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      if (category.categoryImage.length > 0 && category.children.length === 0) {
        options.push({
          value: category._id,
          name: category.name,
          categoryImage: category.categoryImage,
          slug: category.slug,
        });
      }
      //console.log(category.categoryImage.length);
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const { products, loading, noProductMore } = useSelector(
    (state) => state.productsManagement
  );
  const [rejectLoad, setRejectLoad] = useState(false);
  useEffect(() => {
    if (noProductMore === true) setRejectLoad(true);
  }, [noProductMore]);
  //*Operation room

  //*Operation room

  const loadMoreProducts = (i) => {
    if (!rejectLoad) {
      dispatch(getAllProducts(i));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = (e) => {
    if (!loading || rejectLoad === false) {
      console.log('LOgggg here');
      const { scrollTop, scrollHeight } = e.target.documentElement;
      if (window.innerHeight + scrollTop + 1 >= scrollHeight) {
        setTimeout(() => {
          skip++;
          loadMoreProducts(skip);
        }, 1000);
      }
    }
  };

  return (
    <div className="lt-home">
      <PhoneHeaderHome />
      <CategoryHeader categories={categories} />
      <div className="home-feature">
        <Slider {...featureSetting}>
          <div className="home-feature__content">
            <img
              src="/s1.jpg"
              alt="Feature"
              className="home-feature__content-img"
            />
            <p className="home-feature__content-ad">تخفيضات كبيرة</p>
          </div>
          <div className="home-feature__content">
            <img
              src="/s2.jpg"
              alt="Feature"
              className="home-feature__content-img"
            />
            <p className="home-feature__content-ad">تخفيضات كبيرة</p>
          </div>
        </Slider>
      </div>

      <div className="categories-slider">
        <div className="category-content">
          <span className="gn-hed">ألفئات</span>
          <Link className="category-content__link" to="#">
            View all
          </Link>
        </div>
        <Slider {...settings1}>
          {categories.length > 0 &&
            createCategoryList(categories).map((category, i) => (
              <CategoryInsideSlider category={category} key={i} />
            ))}
        </Slider>
      </div>
      {/* <div className="categories-slider"> //!second update
        <div className="category-content">
          <span className="category-content__header">Popular Product</span>
          <Link className="category-content__link" to="#">
            View all
          </Link>
        </div>
        <Slider {...simpleProd}>
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
        </Slider>
      </div> */}
      <span className="gn-hed">أحدث المنتجات</span>
      <Product products={products} />

      {loading && (
        <div className="load-more-container">
          <div className="load-more-container__ring"></div>
          <span className="load-span">جار التحميل</span>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
