import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditProductMain from "./../components/products/EditproductMain";
import products from "./../data/Products";

const ProductEditScreen = ({ match }) => {
  const productId = products.find((p) => p._id === match.params.id);
  return <EditProductMain productId={productId} />;
};
export default ProductEditScreen;
