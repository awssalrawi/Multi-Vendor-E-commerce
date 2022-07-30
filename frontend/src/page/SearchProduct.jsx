import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByFilter } from '../redux/actions/productAction';
import { useParams } from 'react-router-dom';
import FilteredProducts from './FilteredProducts';
import LoaderSpinner from '../component/utilis/LoaderSpinner';
const SearchProduct = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);
  useEffect(() => {
    dispatch(getProductsByFilter(params.keyword));
  }, [dispatch, params.keyword]);

  const { products, loading } = useSelector((state) => state.filteredProducts);

  console.log(products);
  return (
    <div>
      {loading ? <LoaderSpinner /> : <FilteredProducts products={products} />}
    </div>
  );
};

export default SearchProduct;
