import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cusGetShopProduct } from '../redux/actions/productAction';
import { useParams } from 'react-router-dom';
import FilteredProducts from './FilteredProducts';
import LoaderSpinner from '../component/utilis/LoaderSpinner';
import './style/store-page.scss';
import Footer from './../component/layout/Footer';
const StorePage = () => {
  const dispatch = useDispatch();
  const params = useParams();

  console.log('params', params);
  useEffect(() => {
    dispatch(cusGetShopProduct(params.shopname));
  }, []);

  const { data, loading } = useSelector((state) => state.storePage);
  return (
    <Fragment>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <div className="storePage">
          {data?.shop && Object.keys(data.shop).length > 0 && (
            <div className="sp-header">
              <img
                src={
                  data.shop.shopImage
                    ? data.shop.shopImage
                    : 'https://farm4.static.flickr.com/3487/3753752477_ae00218eda_o.jpg'
                }
                alt="Store"
                className="sp-header__img"
              />
            </div>
          )}
          {data.products && data.products.length > 0 && (
            <div className="store-products">
              <FilteredProducts products={data.products} />
            </div>
          )}
          <Footer />
        </div>
      )}
    </Fragment>
  );
};

export default StorePage;
