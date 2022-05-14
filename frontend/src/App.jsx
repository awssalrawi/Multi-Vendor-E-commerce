import { useEffect } from 'react';

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

import PrivateRoute from './component/authCourse/PrivateRoute';
import store from './redux/store';

import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './assests/toast-my-style.scss';

import LoaderSpinner from './component/utilis/LoaderSpinner.jsx';

import Categories from './component/layout/Categories';
import CategoryShow from './generalComponent/CategoreyShow';
import AdminDashboard from './component/admin/AdminDashboard';
import UserList from './component/admin/pages/UserList';
import DashHome from './component/admin/pages/DashHome';
import AdminProductList from './component/admin/productPage/AdminProductList';
import AdminGetUser from './component/admin/pages/AdminGetUser';
import AdminCreateUser from './component/admin/pages/AdminCreateUser';
import AdminFeedbacks from './component/admin/reviewPage/AdminFeedbacks';
import AdminGetProduct from './component/admin/productPage/AdminGetProduct';
import { getMyProfileData } from './redux/actions/userAction';
import AdminCategory from './component/admin/categoryPage/AdminCategory';
import AdminShowProducts from './component/admin/productPage/AdminShowProducts';

function App() {
  useEffect(() => {
    if (localStorage.getItem('authTokenReload')) {
      store.dispatch(getMyProfileData());
    }
  });
  return (
    <Router>
      <Header />
      <ToastContainer
        position={toast.POSITION.TOP_CENTER}
        draggable={true}
        transition={Zoom}
        className="error-toast"
        hideProgressBar={true}
        autoClose={1000}
        pauseOnHover={true}
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
        <Route path="/test" element={<CategoryShow />} />
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}

        {/* <Route exact path="/me" element={<MyProfile />} /> */}
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/product" element={<ProductDetails />} />
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
        </Route>
        <Route element={<PrivateRoute />}>
          <Route exact path="/me" element={<MyProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
