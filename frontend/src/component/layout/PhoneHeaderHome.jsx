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

  //*currency and translate
  const { t, i18n } = useTranslation();

  const [selectCurrency, setSelectCurrency] = useState('IQD');

  useEffect(() => {
    dispatch(selectedCurrency(selectCurrency));
    console.log('I called inside appjs currency effect');
  }, [selectCurrency]);

  //*currency and translate

  return (
    <Fragment>
      <div className="headerPhone-component">
        <Link to="/" className="text-decoration-none">
          <img src="/logo.png" alt="logo" className="headerPhone-logo" />
        </Link>
        <div className="topHeader">
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
            <div className="currency-select-container">
              <select
                name="currency"
                id="currency"
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                // defaultValue={i18n.changeLanguage('ar')}
              >
                <option value="ar">ألعربية</option>
                <option value="en">English</option>
                <option value="tr">Türkçe</option>
              </select>
            </div>

            {/* 
            <button
              className="langBtn"
              onClick={() => i18n.changeLanguage('tr')}
            >
              Türkçe
            </button>
            <button
              className="langBtn"
              onClick={() => i18n.changeLanguage('ar')}
            >
              عربي
            </button>
            <button
              className="langBtn"
              onClick={() => i18n.changeLanguage('en')}
            >
              English{' '}
            </button> */}
          </div>
          {/* <span className="langBtn">{t('hello')}</span> */}
        </div>
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
