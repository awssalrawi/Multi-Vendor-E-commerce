import React, { Fragment } from 'react';
import Product from '../component/products/Product';
const GridShow = ({ products }) => {
  return (
    <Fragment>
      <Product products={products} />
    </Fragment>
  );
};

export default GridShow;
