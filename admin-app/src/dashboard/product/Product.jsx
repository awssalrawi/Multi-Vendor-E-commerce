import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { product } = props;

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src={product.cardPicture} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {product.name}
            </Link>
            <div className="price mb-2">{`${
              product.priceAfterDiscount
                ? product.priceAfterDiscount
                : product.price
            } ${product.currency}`}</div>
            <div className="row">
              <Link
                to={`/seller-products/${product._id}`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                state={product}
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to={`/seller-products/${product._id}`}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
                state={product}
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
