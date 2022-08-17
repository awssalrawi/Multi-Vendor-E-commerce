import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleSign from './GoogleSign';
import NewGoogleSign from './NewGoogleSign';
import FacebookSign from './FacebookSign';
import {
  EmailOutlined,
  LockOutlined,
  PersonOutlineOutlined,
} from '@material-ui/icons';
import { toast } from 'react-toastify';
import {
  signUpWithEmailAndPassword,
  clearErrors,
} from '../../redux/actions/userAction';
// import { UilUser } from "@iconscout/react-unicons";
import './style/login.scss';
import { Link } from 'react-router-dom';
import InfoReadDialog from '../utilis/InfoReadDialog';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);
  const { message, error } = useSelector((state) => state.auth);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('checked', checked);
    if (!checked)
      return toast.warning(
        'Please read and accept term and conditions before registering.'
      );

    dispatch(signUpWithEmailAndPassword(name, email, password));
  };

  return (
    <Fragment>
      <div className="auth">
        <div className="auth__container">
          <span className="auth__header">التسجيل عبر البريد الالكتروني</span>
          <form action="#" className="auth__form" onSubmit={submitHandler}>
            <div className="auth__input">
              <input
                type="text"
                placeholder="الاسم"
                className="auth__input-field"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                min={3}
              />
              <PersonOutlineOutlined className="login-icons icon-p" />
              {/* <i className="uil uil-user icon-p"></i> */}
            </div>
            <div className="auth__input">
              <input
                type="email"
                placeholder="البريد الالكتوني"
                className="auth__input-field"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <EmailOutlined className="login-icons icon-left " />
              {/* <i className="uil uil-envelope icon-left"></i> */}
            </div>
            <div className="auth__input">
              <input
                required
                type="password"
                placeholder="كلمة السر"
                className="auth__input-field passwords"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <LockOutlined className="login-icons icon-left" />
            </div>
            <div className="check-pass">
              <div className="check-container">
                {/* <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                /> */}
                <input
                  type="checkbox"
                  className="check"
                  id="checkLog"
                  onChange={handleChange}
                />

                <InfoReadDialog
                  name="الشروط"
                  header="Terms and Conditions"
                  content="cccccccc"
                />
                <span className="check-span">قرات واوافق على </span>
                {/* <Link to="#" className="link">
                    conditions
                  </Link> */}
              </div>
            </div>

            <div className="auth__btn">
              <button type="submit" className="auth__btn-login">
                سجل الان
              </button>
            </div>
            <p className="text-align-center my-0">او</p>
            {/* <div className="auth__btn">
              <input
                type="button"
                value="Sign with Google"
                className="auth__btn-google"
              />
            </div> */}
            <div className="google-facebook-login">
              <div className="goog-box">
                {/* <NewGoogleSign /> */}
                <GoogleSign text="sign awss" />
              </div>
              <div className="goog-box">
                <FacebookSign />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
