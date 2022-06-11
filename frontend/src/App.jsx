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

import ActivateCourse from './component/authCourse/ActivateCourse';

import IfLoggedIn from './component/restrictUser/IfLoggedIn';
import store from './redux/store';

import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './assests/toast-my-style.scss';

import LoaderSpinner from './component/utilis/LoaderSpinner.jsx';
import { getAllCategories } from './redux/actions/categoryAction';
import { adminGetAllProducts } from './redux/actions/productAction';
import Categories from './component/layout/Categories';
import CategoryShow from './generalComponent/CategoreyShow';
import AdminDashboard from './component/admin/AdminDashboard';
import UserList from './component/admin/pages/UserList';
import DashHome from './component/admin/pages/DashHome';
import ProductsListPage from './component/products/ProductsListPage';
//* Admin
import AdminProductList from './component/admin/productPage/AdminProductList';
import AdminGetUser from './component/admin/pages/AdminGetUser';
import AdminCreateUser from './component/admin/pages/AdminCreateUser';
import AdminFeedbacks from './component/admin/reviewPage/AdminFeedbacks';
import AdminGetProduct from './component/admin/productPage/AdminGetProduct';
import { getMyProfileData } from './redux/actions/userAction';
import AdminCategory from './component/admin/categoryPage/AdminCategory';
import AdminShowProducts from './component/admin/productPage/AdminShowProducts';
import AdminCreateCategory from './component/admin/categoryPage/AdminCreateCategory';
import AdminGetCategoryAndUpdate from './component/admin/categoryPage/AdminGetCategoryAndUpdate';
import AdminCreateProduct from './component/admin/productPage/AdminCreateProduct';
import Page from './component/admin/ShowPage/Page';
import CartPage from './component/cart/CartPage';
import { useSelector } from 'react-redux';
import { updateCart } from './redux/actions/cartAction';

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
    store.dispatch(adminGetAllProducts());
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
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/activate" element={<LoaderSpinner />} />
        {/* <Route exact path="/activate" element={<ActivateAccountMs />} /> */}
        <Route
          exact
          path="/user/active-account/:token"
          element={<ActivateCourse />}
        />
        {/* <Route exact path="/login" element={<Login />} /> */}
        {/* <Route exact path="/signup" element={<SignUpCourse />} /> */}
        <Route exact path="/signup" element={<Register />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/:slug" element={<ProductsListPage />} />
        <Route path="/test" element={<CategoryShow />} />
        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}

        {/* <Route exact path="/me" element={<MyProfile />} /> */}
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/product/:productId" element={<ProductDetails />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="" element={<DashHome />} />
          <Route path="user-list" element={<UserList />} />
          <Route path="user-list/:userId" element={<AdminGetUser />} />
          <Route path="admincreateuser" element={<AdminCreateUser />} />
          <Route path="product" element={<AdminProductList />} />
          <Route path="product/:productId" element={<AdminGetProduct />} />
          <Route path="feedbacks" element={<AdminFeedbacks />} />
          <Route path="categories" element={<AdminCategory />} />
          <Route path="viewproducts" element={<AdminShowProducts />} />
          <Route path="create-category" element={<AdminCreateCategory />} />
          <Route path="page" element={<Page />} />
          <Route
            path="categories/:categoryId"
            element={<AdminGetCategoryAndUpdate />}
          />

          <Route path="create-product" element={<AdminCreateProduct />} />
        </Route>
        <Route element={<IfLoggedIn />}>
          <Route exact path="/me" element={<MyProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
