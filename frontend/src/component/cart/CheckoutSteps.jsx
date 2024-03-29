import React, { useState, Fragment } from 'react';
import {
  Typography,
  Paper,
  Button,
  StepContent,
  StepLabel,
  Step,
  Stepper,
  Box,
} from '@mui/material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import UserAddress from './UserAddress';
import './styles/chekout-steps.scss';
import { toast } from 'react-toastify';
import SummaryCart from './SummaryCart';
import DisplaySelectedItems from './DisplaySelectedItems';
import { useSelector, useDispatch } from 'react-redux';
import { LocalShippingOutlined } from '@material-ui/icons';
import {
  realPrice,
  designPrice,
  priceConvert,
  convertToUsd,
} from '../../assests/currencyControl';
import ButtonMat from '../../generalComponent/ButtonMat';
import { useNavigate } from 'react-router-dom';
import { userAddOrder } from '../../redux/actions/orderAction';
import NameOfPage from '../utilis/NameOfPage';
import PageTitle from '../utilis/PageTitle';
//*Theme

//*Theme
export default function CheckoutSteps() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addressData, setAddressData] = useState('');
  const [userAddressData, setUserAddressData] = useState(' ');
  const [summaryObject, setSummaryObject] = useState(' ');
  const [buyBtnActive, setBuyBtnActive] = useState(true);
  const { cartItems } = useSelector((state) => state.cart);
  const { currs, selectedCurrency } = useSelector((state) => state.currency);
  const comingAddressFormAddressComponent = (data) => {
    setAddressData(data);
  };

  const steps = [
    {
      label: 'العنوان',
      description: (
        <UserAddress sendAddressToParent={comingAddressFormAddressComponent} />
      ),
    },
    {
      label: 'المنتجات المختارة',
      description: <DisplaySelectedItems />,
    },
    {
      label: 'طرق الدفع',
      description: (
        <div className="payment-method-select">
          <div className="cos-payment-method">
            <input type="radio" className="cos-pay-on-door" defaultChecked />
            <span className="text-pay-door">{'دفع عند التوصيل'}</span>
          </div>
          <div className="cos-payment-method">
            <input type="radio" className="cos-pay-on-door" disabled />
            <span className="text-pay-bank">
              {'دفع باستخدام بطاقة الائتمان ...قريبا'}
            </span>
          </div>
        </div>
      ),
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const getSummaryInfo = (data) => {
    setSummaryObject(data);
  };
  //*Model
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log('assss', addressData);

  const showAddressField = (addressDetail, city, state = null, country) => {
    let address = ' ';
    if (addressDetail.slice(-1) !== '.') {
      address = `${addressDetail}.${state ? state : null}.${city}. ${country}`;
    } else {
      address = `${addressDetail} ${state ? state : null}. ${city}. ${country}`;
    }

    return address;
  };

  const handleSubmitOrder = () => {
    const makeOrder = {
      address: {
        receiver: addressData.activeAddress.name,
        phoneNo: addressData.activeAddress.phoneNumber,
        addressDetail: showAddressField(
          addressData.activeAddress.addressDetail,
          addressData.activeAddress.city,
          addressData.activeAddress.state,
          addressData.activeAddress.country
        ),
      },
      totalAmountInDollar: summaryObject.totalAmountInDollar * 1,
      totalAmountText: summaryObject.finalPriceText,
      receiver: userAddressData.name,
      items: cartItems.map((item) => ({
        productId: item._id,
        payedPrice: priceConvert(
          selectedCurrency,
          item.currency,
          item.price,
          currs
        ),
        payedCurrency: selectedCurrency,
        shop: item.shop,
        specific: item.specific ? item.specific : undefined,
        payedPiceInDollar: priceConvert(
          'USD',
          item.currency,
          item.price,
          currs
        ),
        purchasedQty: item.cartQuant,
      })),
    };
    console.log('order', makeOrder);
    const promise = dispatch(userAddOrder(makeOrder));
    setOpen(false);

    toast
      .promise(promise, {
        loading: 'Loading',
        error: 'Error happened',
      })
      .then(() => navigate('/order-success'))
      .catch((error) => {
        toast.error(error);
      });
  };
  //*Model

  // const handleSubmitOrder = () => {};
  const handleNext = (index) => {
    if (index === 0) {
      console.log('I am inside addresses select index');
      if (!addressData?.type) {
        return toast.error('Please Provide Your address');
      }
      setUserAddressData(addressData.activeAddress);
    }

    if (index === 2) {
      setBuyBtnActive(false);
    } else {
      setBuyBtnActive(true);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    <Fragment>
      <PageTitle title="Shopping" />
      <NameOfPage text="الشراء" />
      <div className="place-order">
        <div className="checkout-page">
          <div>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              sx={{ color: 'green' }}
            >
              {steps.map((step, index) => (
                <Step key={step.label} sx={{ color: 'green' }}>
                  <StepLabel
                    optional={
                      index === 2 ? (
                        <Typography variant="caption">
                          الخطوة الاخيرة
                        </Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <div>{step.description}</div>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={() => handleNext(index)}
                          sx={{
                            mt: 1,
                            mr: 1,
                            backgroundColor: '#fc9539',
                            width: '10rem',
                            '&:hover': { backgroundColor: '#ec9922' },
                          }}
                        >
                          {index === steps.length - 1 ? 'انهاء ' : 'التالي'}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1, width: '10rem', color: '#000' }}
                        >
                          {'رجوع'}
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>

            {activeStep === steps.length && (
              <Paper
                square
                elevation={0}
                sx={{ p: 3, backgroundColor: 'inherit' }}
              >
                <Typography>
                  {
                    'اكتملت جميع الخطوات - الآن قمت بوضع طلبك ، يرجى النقر على اشتري الآن'
                  }
                </Typography>
              </Paper>
            )}
          </div>
        </div>
        <div className="checkout-summary">
          <SummaryCart summaryObj={getSummaryInfo} />
          <ButtonMat
            name="أطلب الان"
            icon={<LocalShippingOutlined fontSize="large" />}
            className="buy-order-btn"
            disabled={buyBtnActive}
            onClick={handleClickOpen}
          />

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'أتمام عملية الشراء'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {
                  'ستستغرق العملية 21 يومًا كحد أقصى ، في حالة وجود أي مشكلة  تحدث مع طلبك كأرسال منتج اخر، تتكفل الشركة بحل هذة المشكلة .هدفنا هو اتمام عملية البيع والشراء التي تحدث بين المشتري والبائع بطريقة شفافة ونزية . عند وصول البضاعة اليك احتفظ بالفاتورة المرسلة من طرفنا لان رقم الطلب المكتوب عليها يمثل الدليل لنا لايجاد الطلب الخاص بك على قاعده البيناتات وبلتالي نتمكن من مساعدك بطريقة سريعة بامكانك الضغط على اشتري الان لانهاء الطلب '
                }
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} sx={{ color: 'black' }}>
                الغاء
              </Button>
              <Button
                onClick={handleSubmitOrder}
                autoFocus
                sx={{ color: 'green' }}
              >
                أشتري الان
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </Fragment>
  );
}

//*7777777777777
