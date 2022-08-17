import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
// import products from "../../data/Products";
import { Settings, DeleteOutline } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerProducts,
  clearErrors,
  clearMessage,
} from "../../redux/actions/productAction";
import LoaderSpinner from "../../utilities/LoaderSpinner/LoaderSpinner";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import PageTitle from "../utilities/PageTitle";
const MainProducts = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSellerProducts());
  }, []);

  const { products, error, message, loading } = useSelector(
    (state) => state.sellerProduct
  );

  const [myProducts, setMyProducts] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  useEffect(() => {
    if (products.length > 0) {
      setMyProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch]);

  const handleSearchFilter = (e) => {
    setSearchStr(e.target.value.toLocaleLowerCase());
  };
  const filteredProds = myProducts.filter((product) =>
    product.name.toLocaleLowerCase().includes(searchStr)
  );
  //setMyProducts(filteredProds);
  return (
    <Fragment>
      <PageTitle title="Products" />
      {loading ? (
        <LoaderSpinner text="loading" />
      ) : (
        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">{t("Products")}</h2>
            <div>
              <Link to="/seller/create-prod" className="btn btn-primary">
                {t("Create_new")}
              </Link>
            </div>
          </div>

          <div className="card mb-4 shadow-sm">
            <header className="card-header bg-white ">
              <div className="row gx-3 py-3">
                <div className="col-lg-4 col-md-6 me-auto ">
                  <input
                    type="search"
                    placeholder={`${t("Search")}...`}
                    className="form-control p-2"
                    onChange={(e) => handleSearchFilter(e)}
                  />
                </div>

                {/* <div className="col-lg-2 col-6 col-md-3"> //!Next update
                  <select className="form-select">
                    <option>Latest added</option>
                    <option>Cheap first</option>
                    <option>Most viewed</option>
                  </select>
                </div> */}
              </div>
            </header>

            <div className="card-body">
              <div className="row">
                {/* Products */}
                {filteredProds.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              </div>

              <nav className="float-end mt-4" aria-label="Page navigation">
                <ul className="pagination">
                  <li className="page-item disabled">
                    <Link className="page-link" to="#">
                      Previous
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" to="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      Next
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default MainProducts;
