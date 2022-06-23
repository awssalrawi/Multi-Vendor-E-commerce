import React, { useState } from 'react';
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
  convertToUsd,
} from '../../assests/currencyControl';
import ButtonMat from '../../generalComponent/ButtonMat';
import { useNavigate } from 'react-router-dom';
import { userAddOrder } from '../../redux/actions/orderAction';
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
      label: 'Address',
      description: (
        <UserAddress sendAddressToParent={comingAddressFormAddressComponent} />
      ),
    },
    {
      label: 'Selected Products',
      description: <DisplaySelectedItems />,
    },
    {
      label: 'Payment Method',
      description: (
        <div className="payment-method-select">
          <div className="cos-payment-method">
            <input type="radio" className="cos-pay-on-door" defaultChecked />
            <span className="text-pay-door">Pay on Door</span>
          </div>
          <div className="cos-payment-method">
            <input type="radio" className="cos-pay-on-door" disabled />
            <span className="text-pay-bank">
              Pay With Vize or MasterCard ..soon
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

  const handleSubmitOrder = () => {
    const makeOrder = {
      addressId: userAddressData._id,
      totalAmountInDollar: summaryObject.priceInDollar * 1,
      totalAmountText: summaryObject.finalPriceText,
      receiver: userAddressData.name,
      items: cartItems.map((item) => ({
        productId: item._id,
        payedPrice: realPrice(selectedCurrency, currs, item.price),
        payedCurrency: selectedCurrency,
        shop: item.shop,
        specific: item.specific ? item.specific : undefined,
        payedPiceInDollar: item.price,
        purchasedQty: item.cartQuant,
      })),
    };

    const promise = dispatch(userAddOrder(makeOrder));
    setOpen(false);

    toast
      .promise(promise, {
        loading: 'Loading',
        success: 'The request has been successfully received',
        error: 'Error happened',
      })
      .then(() => navigate('/order-success'))
      .catch((error) => {
        toast.error(error);
      });
  };
  //*Model
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
    <div className="place-order">
      <div className="checkout-page">
        <div>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption">Last step</Typography>
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
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
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
                All steps completed - Now You Put your order, Please Click on
                Buy Now
              </Typography>
            </Paper>
          )}
        </div>
      </div>
      <div className="checkout-summary">
        <SummaryCart summaryObj={getSummaryInfo} />
        <ButtonMat
          name="Buy Now"
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
            {'You are requesting Order form Ltreda '}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The Process will take at maximum 20 day , if there any Problem
              happens with your Order{' '}
              <strong>Link sent another Product vs.</strong>
              Ltreda will be responsible for Solve it
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{}}>
              Disagree
            </Button>
            <Button onClick={handleSubmitOrder} autoFocus>
              Buy Now
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

//*7777777777777
