import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/phoneHeaderHome.scss';
import {
  getCurrencyConst,
  selectedCurrency,
} from '../../redux/actions/currencyAction';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@material-ui/icons';
import Search from './Search';
const PhoneHeaderHome = () => {
  const dispatch = useDispatch();
  const { appImgs } = useSelector((state) => state.currency);
  //*currency and translate
  const { t, i18n } = useTranslation();

  // const [selectCurrency, setSelectCurrency] = useState('IQD');

  // useEffect(() => {
  //   dispatch(selectedCurrency(selectCurrency));
  //   console.log('I called inside appjs currency effect');
  // }, [selectCurrency]);

  //*currency and translate

  return (
    <Fragment>
      <div className="headerPhone-component">
        <Link to="/" className="link">
          {appImgs?.length > 0 ? (
            <img src={appImgs[0].appLogo} alt="logo" className="logo" />
          ) : (
            <span className="text-logo">Ltreda</span>
          )}
          {/* <img src="./logo.png" alt="logo" className="logo" /> */}
        </Link>

        {/* <form action="#" className="headerPhone-form">
          <input
            type="text"
            className="headerPhone-form__input"
            placeholder="Search product"
          />
          <button className="headerPhone-form__button">
            <SearchOutlined style={{ color: 'orange' }} />
          </button>
        </form> */}
        <Search />
      </div>
    </Fragment>
  );
};

export default PhoneHeaderHome;
