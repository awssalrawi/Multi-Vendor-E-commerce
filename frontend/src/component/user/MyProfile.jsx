import React, { Fragment, useState, useEffect } from 'react';
import './style/MyProfile.scss';
import NameOfPage from '../utilis/NameOfPage';
import { useSelector, useDispatch } from 'react-redux';
import LoaderSpinner from '../utilis/LoaderSpinner';
import { useNavigate } from 'react-router-dom';
import ButtonMat from '../../generalComponent/ButtonMat';
import PageTitle from '../utilis/PageTitle';
import {
  LocalMallOutlined,
  ShoppingBasketOutlined,
  AccountCircleOutlined,
  VpnKeyOutlined,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import clsx from 'clsx';
import {
  makeStyles,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormHelperText,
  FormControl,
} from '@material-ui/core';
import Footer from '../layout/Footer';
import { selectCurr } from '../../redux/actions/currencyAction';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const showDate = (date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  //*Update functions
  const classes = useStyles();
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const [newName, setNewName] = useState('');
  const [currentPass, setCurrentPass] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfig, setNewPasswordConfig] = useState('');

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUpdateName = () => {
    console.log('new Name', newName);
  };

  const handleUpdatePassword = () => {
    console.log('currentPass', currentPass);
    console.log('newPassword', newPassword);
    console.log('newPasswordConfig', newPasswordConfig);
  };
  //*Update functions

  //*Currency
  const [selectCurrency, setSelectCurrency] = useState('IQD');

  useEffect(() => {
    dispatch(selectCurr(selectCurrency));
    console.log('I called inside appjs currency effect');
  }, [selectCurrency]);
  //*Currency
  return (
    <Fragment>
      <PageTitle title="My Profile" />
      <NameOfPage text="حسابي" />
      {loading ? (
        <LoaderSpinner />
      ) : (
        <div className="profile">
          <div className="profile__content">
            <div className="user-update">
              <div className="mp-input-update">
                <span className="mp-input-update__head">{'تغيير العملة'}</span>
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
                <div className="language-selector"></div>
              </div>
              <div className="mp-input-update">
                <span className="mp-input-update__head">{'تغيير الاسم'}</span>
                <FormControl
                  className={clsx(
                    classes.margin,
                    classes.withoutLabel,
                    classes.textField
                  )}
                >
                  <Input
                    id="standard-adornment-weight"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    // endAdornment={
                    //   <InputAdornment position="end">Kg</InputAdornment>
                    // }
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    ألاسم المستخدم
                  </FormHelperText>
                </FormControl>
                <ButtonMat
                  name="تغيير الاسم"
                  icon={<AccountCircleOutlined />}
                  onClick={() => handleUpdateName()}
                />
              </div>
              <div className="mp-input-update">
                <span className="mp-input-update__head">
                  {'تغيير كلمة السر'}
                </span>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="standard-adornment-current-pass">
                    كلمة السر الحالية
                  </InputLabel>
                  <Input
                    id="standard-adornment-current-pass"
                    type={values.showPassword ? 'text' : 'password'}
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="new-pass">كلمة السر الجديدة</InputLabel>
                  <Input
                    id="new-pass"
                    type={values.showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="pass-conform">
                    تاكيد كلمة السر الجديدة
                  </InputLabel>
                  <Input
                    id="pass-conform"
                    type={values.showPassword ? 'text' : 'password'}
                    value={newPasswordConfig}
                    onChange={(e) => setNewPasswordConfig(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <ButtonMat
                  name="قم بتغيير كلمة السر"
                  onClick={() => handleUpdatePassword()}
                  icon={<VpnKeyOutlined />}
                />
              </div>
            </div>
            <div className="user-info">
              <div className="info__container">
                <p className="info-field">{user.name}</p>
                <p className="info-label">{': الاسم'}</p>
              </div>
              <div className="info__container">
                <p className="info-field">{user.email}</p>
                <p className="info-label">{': الايميل'}</p>
              </div>
              <div className="info__container">
                <p className="info-field">{showDate(user.createdAt)}</p>
                <p className="info-label">{': تاريخ الانضمام'}</p>
              </div>
              <div className="info__container">
                <p className="info-field">{user.point}</p>
                <p className="info-label">{': النقاط'}</p>
              </div>
              <div className="info__container">
                <ButtonMat
                  name="الطلبات خاصتي"
                  className="mp-btn-order"
                  icon={<LocalMallOutlined />}
                  onClick={() => navigate('/my-orders')}
                />
              </div>
              <div className="info__container">
                <ButtonMat
                  name="عربة التسوق"
                  className="mp-btn-cart"
                  icon={<ShoppingBasketOutlined />}
                  onClick={() => navigate('/cart')}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </Fragment>
  );
};

export default MyProfile;
