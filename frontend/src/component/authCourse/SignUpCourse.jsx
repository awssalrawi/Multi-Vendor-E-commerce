import React, { Fragment, useState } from "react";
//import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "../../assests/toast-my-style.scss";

const SignUpCourse = () => {
  //const navigate = Navigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const { name, email, password, buttonText } = data;
  const handelChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    setData({ ...data, buttonText: "Submitting..." });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(data);
    axios
      .post("/api/v1/user/signup", data, config)
      .then((res) => {
        setData({
          ...data,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted",
          loading: false,
        });
        console.log("SignUp process", res);
        toast.success(res.data.message);
      })
      .catch((e) => {
        setData({ ...data, buttonText: "Submit" });

        toast.error(e.response.data.message);
        console.log(e);
      });
  };
  const signupForm = () => (
    <form>
      <div className="form-group">
        <label htmlFor="name" className="text-muted">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="form-control"
          onChange={handelChange("name")}
          placeholder="Name"
          value={name}
        />
        <label htmlFor="email" className="text-muted">
          email
        </label>
        <input
          id="email"
          type="text"
          className="form-control"
          onChange={handelChange("email")}
          placeholder="Email"
          value={email}
        />
        <label htmlFor="pass" className="text-muted">
          password
        </label>
        <input
          id="pass"
          type="password"
          className="form-control"
          onChange={handelChange("password")}
          placeholder="Password"
          value={password}
        />
        <div>
          <button className="btn btn-primary" onClick={handelSubmit}>
            {buttonText}
          </button>
        </div>
      </div>
    </form>
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
        <h1 className="text-center">Sign Up</h1>
        <div className="col-md-6 offset-md-3">{signupForm()}</div>
      </div>
    </Fragment>
  );
};

export default SignUpCourse;
