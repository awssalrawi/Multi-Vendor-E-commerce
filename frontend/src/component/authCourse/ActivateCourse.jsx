import React, { Fragment, useState, useEffect } from 'react';
//import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../../assests/toast-my-style.scss';
import { useParams } from 'react-router-dom';
//import jwt from "jsonwebtoken";
import jwtDecode from 'jwt-decode';
const ActivateCourse = () => {
  const [data, setData] = useState({
    name: '',
    token: '',
    show: true,
  });

  const { name, token, show } = data;
  const params = useParams();
  // useEffect(() => {
  //   let token = params.token;
  //   let { name } = jwtDecode(token);
  //   setData({ ...data, name, token });
  //   console.log("Token", token);
  // }, []);

  const handelSubmit = (e) => {
    e.preventDefault();
    setData({ ...data, buttonText: 'Submitting...' });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(data);
    axios
      .post(`/api/v1/user/active-account`, { token }, config)
      .then((res) => {
        setData({
          ...data,

          buttonText: 'Submitted',
        });
        console.log('Signin process', res);
        toast.success(res.data.message);
      })
      .catch((e) => {
        setData({ ...data, buttonText: 'Submit' });

        toast.error(e.response.data.message || e.response.data.error);
        console.log(e);
      });
  };

  const activateLink = () => (
    <Fragment>
      <h1 className="text-center">Activation Link</h1>
      <div>
        <h1 className="text-center p-5">
          Hey {name} Ready to activate your account
        </h1>
        <button className="btn btn-primary" onClick={handelSubmit}>
          Click
        </button>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <div className="container">
        <ToastContainer
          position={toast.POSITION.TOP_CENTER}
          draggable={true}
          transition={Zoom}
          className="error-toast"
          hideProgressBar={true}
          autoClose={1000}
          pauseOnHover={true}
        />

        <div className="col-md-6 offset-md-3">{activateLink()}</div>
      </div>
    </Fragment>
  );
};

export default ActivateCourse;
