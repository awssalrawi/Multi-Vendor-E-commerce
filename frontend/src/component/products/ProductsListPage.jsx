import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductsBySlug } from '../../redux/actions/productAction';
const ProductsListPage = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    console.log(params);
    dispatch(getProductsBySlug(params.slug));
  }, []);

  return <div>ProductsPage</div>;
};

export default ProductsListPage;
