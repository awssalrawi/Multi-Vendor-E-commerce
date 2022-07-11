import "./App.scss";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./redux/store";

// import { useTranslation } from "react-i18next";
// import {
//   getCurrencyConst,
//   selectedCurrency,
// } from "./redux/actions/currencyAction";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { getAllCategories } from "./redux/actions/categoryAction";
import { getMyProfileData } from "./redux/actions/authAction";
import IsSeller from "./strict/IsSeller";
import SellerHome from "./dashboard/SellerHome";
import SellerDashboard from "./dashboard/SellerDashboard";
import Login from "./components/auth/Login";
import SellerOrders from "./dashboard/order/SellerOrders";
import SellerProducts from "./dashboard/product/SellerProducts";
import SellerProfile from "./components/profile/SellerProfile";
// import SellerUpdateProduct from "./dashboard/product/SellerUpdateProduct";
import SellerCreateProduct from "./dashboard/product/SellerCreateProduct";
import { sellerGetInfo, sellerOrders } from "./redux/actions/orderAction";
import { useSelector } from "react-redux";
import SellerOrderDetail from "./dashboard/order/SellerOrderDetail";
//*admin
import AdminDashboard from "./dashboard/admin/AdminDashboard";
import UserList from "./dashboard/admin/pages/UserList";
import DashHome from "./dashboard/admin/pages/DashHome";
import AdminProductList from "./dashboard/admin/productPage/AdminProductList";
import AdminGetUser from "./dashboard/admin/pages/AdminGetUser";
import AdminCreateUser from "./dashboard/admin/pages/AdminCreateUser";
import AdminFeedbacks from "./dashboard/admin/reviewPage/AdminFeedbacks";
import AdminGetProduct from "./dashboard/admin/productPage/AdminGetProduct";
import AdminCategory from "./dashboard/admin/categoryPage/AdminCategory";
import AdminShowProducts from "./dashboard/admin/productPage/AdminShowProducts";
import AdminCreateCategory from "./dashboard/admin/categoryPage/AdminCreateCategory";
import AdminGetCategoryAndUpdate from "./dashboard/admin/categoryPage/AdminGetCategoryAndUpdate";
import AdminCreateProduct from "./dashboard/admin/productPage/AdminCreateProduct";
import Page from "./dashboard/admin/ShowPage/Page";
import AdminOrderList from "./dashboard/admin/orders/AdminOrderList";
import AdminOrderDetail from "./dashboard/admin/orders/AdminOrderDetail";
import BillPdf from "./dashboard/admin/orders/BillPdf";
import IsAdmin from "./strict/IsAdmin";
//*Design pro
import "./style.css";
import "./responsive.css";
import HomeScreen from "./screens/HomeScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailmain from "./components/orders/OrderDetailmain";
import MainProducts from "./components/products/MainProducts";
import SellerUpdateProduct from "./components/products/SellerUpdateProduct";

//*Design pro

function App() {
  // const { t, i18n } = useTranslation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (localStorage.getItem("SellerAuthTokenReload")) {
      store.dispatch(getMyProfileData());
    }
    // store.dispatch(getCurrencyConst());
    store.dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      store.dispatch(sellerGetInfo());
      store.dispatch(sellerOrders());
    }
  }, [isAuthenticated]);
  // const [selectCurrency, setSelectCurrency] = useState("IQD");

  // useEffect(() => {
  //   store.dispatch(selectedCurrency(selectCurrency));
  //   console.log("I called inside appjs currency effect");
  // }, [selectCurrency]);

  return (
    <Router>
      {/* <div className="topHeader">
        <div className="currency-select-container">
          <select
            name="currency"
            id="currency"
            onChange={(e) => setSelectCurrency(e.target.value)}
          >
            <option value="IQD">IQD</option>
            <option value="USD">USD</option>
            <option value="TRY">TRY</option>
          </select>
        </div>
        <div className="language-selector">
          <button className="langBtn" onClick={() => i18n.changeLanguage("tr")}>
            Türkçe
          </button>
          <button className="langBtn" onClick={() => i18n.changeLanguage("ar")}>
            عربي
          </button>
          <button className="langBtn" onClick={() => i18n.changeLanguage("en")}>
            English{" "}
          </button>
        </div>
        <span className="langBtn">{t("hello")}</span>
      </div> */}

      <ToastContainer
        position={toast.POSITION.TOP_CENTER}
        draggable={true}
        transition={Zoom}
        className="error-toast"
        hideProgressBar={true}
        autoClose={1500}
        pauseOnHover={true}
        style={{ fontSize: "14px" }}
      />
      <Routes>
        <Route exact path="/login-seller" element={<Login />} />

        <Route element={<IsSeller />}>
          {/* <Route exact path="" element={<HomeScreen />}> */}
          <Route path="/" element={<SellerDashboard />}>
            {/* <Route path="/" element={<HomeScreen />}> */}
            <Route path="" element={<HomeScreen />} />

            <Route exact path="seller-orders" element={<OrderScreen />} />
            {/* <Route exact path="seller-orders" element={<OrderScreen />} /> */}
            {/* <Route path={"sel-orders"} element={<OrderScreen />} /> */}
            <Route path="seller-products" element={<MainProducts />} />
            {/* <Route path="seller-products" element={<SellerProducts />} /> */}
            <Route path="seller-profile" element={<SellerProfile />} />
            <Route
              path="seller/create-prod"
              element={<SellerCreateProduct />}
            />
            <Route
              path="seller-orders/:orderId"
              element={<OrderDetailmain />}
            />
            {/* <Route
              path="seller-orders/:orderId"
              element={<SellerOrderDetail />}
            /> */}
            <Route
              path="seller-products/:productId"
              element={<SellerUpdateProduct />}
            />
          </Route>
        </Route>

        <Route path="/admin" element={<AdminDashboard />}>
          <Route element={<IsAdmin />}>
            <Route path="" element={<DashHome />} />
            <Route path="user-list" element={<UserList />} />
            <Route path="order/bill" element={<BillPdf />} />
            <Route path="user-list/:userId" element={<AdminGetUser />} />
            <Route path="admincreateuser" element={<AdminCreateUser />} />
            <Route path="product" element={<AdminProductList />} />
            <Route path="product/:productId" element={<AdminGetProduct />} />
            <Route path="feedbacks" element={<AdminFeedbacks />} />
            <Route path="categories" element={<AdminCategory />} />
            <Route path="viewproducts" element={<AdminShowProducts />} />
            <Route path="create-category" element={<AdminCreateCategory />} />
            <Route path="page" element={<Page />} />
            <Route path="orders" element={<AdminOrderList />} />
            <Route path="orders/:orderId" element={<AdminOrderDetail />} />
            <Route
              path="categories/:categoryId"
              element={<AdminGetCategoryAndUpdate />}
            />

            <Route path="create-product" element={<AdminCreateProduct />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
