import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import UserAddress from './UserAddress';
import './styles/chekout-steps.scss';
import { toast } from 'react-toastify';
import SummaryCart from './SummaryCart';
import DisplaySelectedItems from './DisplaySelectedItems';
export default function CheckoutSteps() {
  const [addressData, setAddressData] = useState('');
  const [userAddressData, setUserAddressData] = useState(' ');

  //*Currency work

  const [first, setfirst] = useState('');
  const [second, setSecond] = useState('');
  const API_ACCESS_KEY = 'CS1r39bF3kOuwUzL8rwuUcEUDmp0sdP5';

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const result = await axios.get(
      `https://api.exchangeratesapi.io/v1/latest?access_key=${API_ACCESS_KEY}`
    );

    console.log(result);
  }
  //*Currency work

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
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
    {
      label: 'Get your Bell',
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    console.log('test', addressData);
    if (!addressData?.type) {
      return toast.error('Please Provide Your address');
    }
    setUserAddressData(addressData.activeAddress);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
                        onClick={handleNext}
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
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </div>
      </div>
      <div className="checkout-summary">
        <SummaryCart />
      </div>
    </div>
  );
}

//*7777777777777
