import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAddress,
  addAddress,
  clearErrors,
  clearMessage,
  removeAddress,
} from '../../redux/actions/userAction';
import './styles/user-address.scss';
import {
  PersonOutlineRounded,
  PhoneAndroidRounded,
  Add,
  BookmarkBorderOutlined,
  LocationOn,
  DeleteForeverOutlined,
  Forward,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import ButtonMat from '../../generalComponent/ButtonMat';
import { toast } from 'react-toastify';

import { css } from '@emotion/react';
import { FadeLoader } from 'react-spinners';

import Input from 'react-phone-number-input/input';
import CustomDialog from './CustomDialog';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
//*Dialog Functions

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
//*Dialog Functions
//*Iraq Cities
const IraqCities = [
  'Al Anbar',
  'Al Basrah',
  'Al Muthanna',
  'Al Qadisiyah',
  'An Najaf',
  'Arbil',
  'As Sulaymaniyah',
  "At Ta'mim",
  'Babil',
  'Baghdad',
  'Dahuk',
  'Dhi Qar',
  'Diyala',
  "Karbala'",
  'Maysan',
  'Ninawa',
  'Salah ad Din',
  'Wasit',
];
//*Iraq Cities

const UserAddress = ({ sendAddressToParent }) => {
  const dispatch = useDispatch();
  const { address, loading, error, message } = useSelector(
    (state) => state.userInfo
  );

  const [selectedAddress, setSelectedAddress] = useState(' ');
  const [userName, setUserName] = useState('');
  const [userCountry, setUserCountry] = useState('Iraq');
  const [userCity, setUserCity] = useState('');
  const [userPhone, setUserPhone] = useState();
  const [userAddressDetail, setUserAddressDetail] = useState('');
  const [userState, setUserState] = useState('');

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    dispatch(getAddress());
  }, [dispatch, message, error]);

  useEffect(() => {
    if (!loading && address?.length > 0) {
      sendAddressToParent(handleAddressDataToMoveOn(address[0]));
    }
    if (!loading && (!address || address?.length === 0)) {
      sendAddressToParent(handleAddressDataToMoveOn(null));
    }
    console.log('second Effect');
  }, [loading]);
  //*model

  const [openNewAddress, setOpenNewAddress] = useState(false);

  const handleClickOpenNewAddress = () => {
    setOpenNewAddress(true);
  };
  const handleCloseNewAddress = () => {
    setOpenNewAddress(false);
  };

  //*model

  //*form for edit and add

  //*custom Functions
  const showAddressField = (addressDetail, city, state = null, country) => {
    let address = ' ';
    if (addressDetail.slice(-1) !== '.') {
      address = `${addressDetail}.${state ? state : null}.${city}. ${country}`;
    } else {
      address = `${addressDetail} ${state ? state : null}. ${city}. ${country}`;
    }

    return address;
  };

  const addAddressForm = (
    nameValue,
    countryValue,
    phoneValue,
    cityValue,
    stateValue,
    addressDetailValue,
    submitHandler,
    handleDeleteAddress
  ) => (
    <div className="add-address">
      <form className="add-address-form" onSubmit={submitHandler}>
        <div className="aaf-from-container">
          <div className="aaf-field-container">
            <label htmlFor="aff-name" className="aaf-field-label">
              Name
            </label>
            <input
              type="text"
              className="aaf-field-input"
              id="aaf-name"
              value={userName ? userName : nameValue}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ahmed Mohammed Ali"
              required
            />
          </div>
          <div className="aaf-field-container">
            <label htmlFor="country_field" className="aaf-field-label">
              Country
            </label>
            <select
              id="country_field"
              className="aaf-field-input"
              value={userCountry ? userCountry : countryValue}
              onChange={(e) => setUserCountry(e.target.value)}
              required
            >
              <option value="Iraq">Iraq</option>
            </select>
          </div>
          <div className="aaf-field-container">
            <label htmlFor="aff-phone" className="aaf-field-label">
              Phone Number +964
            </label>
            <Input
              id="aff-phone"
              placeholder="07xxxxxxxxx"
              country="IQ"
              className="aaf-field-input"
              value={userPhone ? userPhone : phoneValue}
              onChange={setUserPhone}
              required
            />
          </div>
          <div className="aaf-field-container">
            <label htmlFor="city_field" className="aaf-field-label">
              City
            </label>
            <select
              id="city_field"
              className="aaf-field-input"
              value={userCity ? userCity : cityValue}
              onChange={(e) => setUserCity(e.target.value)}
              required
            >
              <option value="">Select State</option>
              {IraqCities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="aaf-field-container">
            <label htmlFor="state-filed" className="aaf-field-label">
              State
            </label>
            <input
              type="text"
              className="aaf-field-input"
              id="state-filed"
              value={userState ? userState : stateValue}
              onChange={(e) => setUserState(e.target.value)}
              placeholder="alfaloja"
            />
          </div>
          <div className="aaf-field-container">
            <label htmlFor="aff-details" className="aaf-field-label">
              Address Details
            </label>
            <textarea
              name="address-information"
              id="aff-details"
              cols="30"
              className="aaf-field-textarea"
              rows="8"
              placeholder="Baghdad/Alyarmok-14ramazan"
              value={userAddressDetail ? userAddressDetail : addressDetailValue}
              onChange={(e) => setUserAddressDetail(e.target.value)}
              required
            ></textarea>
          </div>
        </div>

        {handleDeleteAddress ? (
          <div className="btn-inModel">
            <ButtonMat
              name="Delete"
              icon={<DeleteForeverOutlined fontSize="large" />}
              className="aaf-delete-btn"
              type="button"
              onClick={(e) => handleDeleteAddress(e)}

              // onClick={navigateToCheckout}
            />

            <ButtonMat
              name="Save"
              icon={<BookmarkBorderOutlined fontSize="large" />}
              className="aaf-save-btn"
              type="submit"
            />
          </div>
        ) : (
          <ButtonMat
            name="Save"
            icon={<BookmarkBorderOutlined fontSize="large" />}
            className="aaf-save-btn"
            type="submit"
            // onClick={navigateToCheckout}
          />
        )}
      </form>
    </div>
  );

  //*custom Functions
  //*Handle Form for New Address
  const handleNewAddressForm = (e) => {
    e.preventDefault();
    if (userPhone?.length !== 14) {
      return toast.error('رجاءا ادخل رقم الهاتف بصوره صحيحه');
    }
    const form = {
      name: userName,
      phoneNumber: userPhone,
      country: userCountry,
      city: userCity,
      state: userState,
      addressDetail: userAddressDetail,
    };

    dispatch(addAddress(form));
    console.log('Form tO send', form);

    if (openNewAddress) {
      setOpenNewAddress(false);
    }
    setUserName('');
    setUserCountry('');
    setUserCity('');
    setUserState('');
    setUserAddressDetail('');
    setUserPhone();
  };

  const handleUpdateExistingAddress = (item) => (e) => {
    e.preventDefault();

    const form = {
      _id: item._id,
      name: userName ? userName : item.name,
      phoneNumber: userPhone ? userPhone : item.phoneNumber,
      country: userCountry ? userCountry : item.country,
      city: userCity ? userCity : item.city,
      state: userState ? userState : item.state,
      addressDetail: userAddressDetail ? userAddressDetail : item.addressDetail,
    };

    dispatch(addAddress(form));
    console.log('Form tO send', form);

    if (openNewAddress) {
      setOpenNewAddress(false);
    }
  };
  function handleAddressSelect(i, item) {
    const box = document.querySelectorAll('.address-container');
    sendAddressToParent(handleAddressDataToMoveOn(item));
    box.forEach((add, index) => {
      if (index === i) {
        if (add.classList.contains('selectedAddress')) return;
        add.classList.add('selectedAddress');
        const span = add
          .closest('.address-box')
          .querySelector('.coa-deliver-here');

        span.classList.add('coa-opacity-deliver');

        setSelectedAddress(item);
      } else {
        add.classList.remove('selectedAddress');
        add
          .closest('.address-box')
          .querySelector('.coa-deliver-here')
          .classList.remove('coa-opacity-deliver');
      }
    });

    if (document.querySelector('.selected-item')) {
      selectedAddress(item);
    }
  }

  const handleDeleteAddress = (item) => (e) => {
    dispatch(removeAddress(item));
  };
  //*Handle Form for New Address
  //*final step to send data to parent element

  const handleAddressDataToMoveOn = (item) => {
    if (item) return { type: true, activeAddress: item };

    if (address?.length > 0) {
      return { type: true, activeAddress: address[0] };
    }

    return { type: false, activeAddress: 'Please enter your address' };
  };

  //*final step to send data to parent element

  return (
    <div className="user-address">
      {loading ? (
        <FadeLoader
          color="#ff8219"
          loading={loading}
          css={override}
          size={150}
        />
      ) : (
        <Fragment>
          {address && address.length > 0 ? (
            <div className="container-address-button">
              {address.map((c, i) => (
                <div
                  className="address-box"
                  key={c._id}
                  onClick={() => handleAddressSelect(i, c)}
                >
                  <span
                    className={`coa-deliver-here ${
                      i === 0 ? 'coa-opacity-deliver' : ''
                    }`}
                  >
                    {/* Deliver here */}
                    <Forward />
                  </span>

                  <div
                    className={`address-container ${
                      i === 0 ? 'selectedAddress' : ''
                    }`}
                  >
                    <div className="address-content">
                      <div className="coc-contact">
                        <PersonOutlineRounded className="ucc-icon" />
                        <span className="ucc-txt">{c.name}</span>
                      </div>
                      <div className="coc-contact">
                        <PhoneAndroidRounded className="ucc-icon" />
                        <span className="ucc-txt">{c.phoneNumber}</span>
                      </div>
                      <div className="coc-contact">
                        <LocationOn className="ucc-icon" />
                        <span className="ucc-txt">
                          {showAddressField(
                            c.addressDetail,
                            c.city,
                            c.state,
                            c.country
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CustomDialog
                    body={addAddressForm(
                      c.name,
                      c.country,
                      c.phoneNumber,
                      c.city,
                      c.state,
                      c.addressDetail,
                      handleUpdateExistingAddress(c),
                      handleDeleteAddress(c)
                    )}
                  />
                </div>
              ))}

              <ButtonMat
                name="Add Address"
                icon={<Add fontSize="large" />}
                className="aaf-add-btn"
                onClick={handleClickOpenNewAddress}
              />

              <BootstrapDialog
                onClose={handleCloseNewAddress}
                aria-labelledby="add-extra-address"
                open={openNewAddress}
              >
                <BootstrapDialogTitle
                  id="add-extra-address"
                  onClose={handleCloseNewAddress}
                >
                  Add New Address
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  {addAddressForm(
                    userName,
                    userCountry,
                    userPhone,
                    userCity,
                    userState,
                    userAddressDetail,
                    handleNewAddressForm,
                    false
                  )}
                </DialogContent>
              </BootstrapDialog>
            </div>
          ) : (
            addAddressForm(
              userName,
              userCountry,
              userPhone,
              userCity,
              userState,
              userAddressDetail,
              handleNewAddressForm,
              false
            )
          )}
        </Fragment>
      )}
    </div>
  );
};

export default UserAddress;
