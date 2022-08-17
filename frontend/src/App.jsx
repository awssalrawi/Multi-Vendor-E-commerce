import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/layout/Home';
import Header from './component/layout/Header';
import Login from './component/user/Login';
import Register from './component/user/Register';
import MyProfile from './component/user/MyProfile';
import ForgotPassword from './component/user/ForgotPassword';
import ProductDetails from './component/products/ProductDetails';
import IfLoggedIn from './component/restrictUser/IfLoggedIn';
import store from './redux/store';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './assests/toast-my-style.scss';
import LoaderSpinner from './component/utilis/LoaderSpinner.jsx';
import { getAllCategories } from './redux/actions/categoryAction';
import { getAllProducts } from './redux/actions/productAction';
// import Categories from './component/layout/Categories';
import CategoryShow from './generalComponent/CategoreyShow';
import ProductsListPage from './component/products/ProductsListPage';
import { getMyProfileData } from './redux/actions/userAction';
import CartPage from './component/cart/CartPage';
import { useSelector } from 'react-redux';
import { updateCart } from './redux/actions/cartAction';
import CheckoutSteps from './component/cart/CheckoutSteps';
import UserOrders from './component/order/UserOrders';
import StorePage from './page/StorePage';
import SearchProduct from './page/SearchProduct';
import { getCurrencyConst } from './redux/actions/currencyAction';
import StaticInfo from './page/StaticInfo';
import OrderSuccess from './component/cart/OrderSuccess';
import NotFound from './page/NotFound';
import Categories from './page/Categories';
function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    store.dispatch(updateCart());
  }, [isAuthenticated]);

  useEffect(() => {
    if (localStorage.getItem('authTokenReload')) {
      store.dispatch(getMyProfileData());
    }
    store.dispatch(getAllCategories());
    store.dispatch(getAllProducts());
    store.dispatch(getCurrencyConst());
  }, []);

  return (
    <Router>
      <Header />
      <ToastContainer
        position={toast.POSITION.TOP_CENTER}
        draggable={true}
        transition={Zoom}
        className="error-toast"
        hideProgressBar={true}
        autoClose={1500}
        pauseOnHover={true}
        style={{ fontSize: '14px' }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:keyword" element={<SearchProduct />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/activate" element={<LoaderSpinner />} />
        <Route exact path="/signup" element={<Register />} />
        {/* <Route path="/categories" element={<Categories />} /> */}
        <Route path="/:slug" element={<ProductsListPage />} />
        <Route path="/test" element={<CategoryShow />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category-list" element={<Categories />} />
        <Route path="store/:shopname" element={<StorePage />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/product/:productId" element={<ProductDetails />} />
        <Route element={<IfLoggedIn />}>
          <Route exact path="/me" element={<MyProfile />} />
          <Route path="/place-order" element={<CheckoutSteps />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/my-orders" element={<UserOrders />} />
        </Route>
        <Route path="/ltreda-info" element={<StaticInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
