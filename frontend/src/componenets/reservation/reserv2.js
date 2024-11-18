import React, { useState } from 'react';
import Navbar from '../home/navbar1';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const Reserv2 = () => {
   const [cardNumber, setCardNumber] = useState('');
  const [bank, setBank] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [activeStep, setActiveStep] = useState(0);  // Track the current step
  
  const totalPrice = 500; // Example total price in DT

  // Define the handleNext function
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1); // Increment activeStep by 1
  };

  // Steps for the Stepper
  const steps = ['Step 1', 'Step 2'];

  return (
    <div style={{ backgroundColor: '#ede7e3', paddingBottom:'2px'}}>
      <Navbar />
  
      {/* Stepper */}
      <Box sx={{ width: '100%', padding: '20px 0', margin: '1% 0%', marginBottom: '0', marginLeft: '30%', width: '40%' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel
                StepIconProps={{
                  style: {
                    color: index === 0 && activeStep === 0 ? '43D649' : '#d69e66', // Green for Step 1
                    fontWeight: 'bold',
                  },
                }}
              />
            </Step>
          ))}
        </Stepper>
      </Box>
  
      {/* Title and description */}
      <div style={{ textAlign: 'center', marginBottom: '2%' }}>
        <h2 style={{ color: '#023047', fontWeight: 'bold' }}>Payment</h2>
        <p style={{ color: '#d69e66', fontSize: '16px' }}>
        Kindly follow the instructions below
        </p>
      </div>
  
      {/* Main container */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: '20px', margin: '0 30%', marginBottom:'2%' }}>
        {/* Left part */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '-10px' }}>
          {/* Transfer Information */}
          <div style={{ textAlign: 'left', marginLeft: '3%' }}>
            <h3 style={{ color: '#023047', fontWeight: 'bold' }}>Transfer Lodgini:</h3>
            <p style={{ color: '#d69e66', fontSize: '14px', margin: '0 0' }}>2 Days at Maison Bella</p>
            <p style={{ color: '#023047', fontWeight: 'bold' }}>Total: {totalPrice} DT</p>
          </div>
        </div>
  
        {/* Divider line */}
        <div
          style={{
            width: '1px',
            backgroundColor: '#d69e66',
            height: '70%',
            margin: '0 20px',
          }}
        ></div>
  
        {/* Right part: Payment Form */}
        <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '-20px' }}>
          {/* Payment Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', color: '#023047' }}>
                Card Number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  color: '#023047',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', color: '#023047' }}>
                Bank
              </label>
              <input
                type="text"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  color: '#023047',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', color: '#023047' }}>
                Exp Date
              </label>
              <input
                type="month"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  color: '#023047',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', color: '#023047' }}>
                CVV
              </label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  color: '#023047',
                }}
              />
            </div>
          </div>
        </div>
      </div>
  
      {/* Center buttons */}
      <div style={{ display: 'flex', gap: '5%', marginTop: '30px', marginBottom: '30px', justifyContent: 'center', paddingBottom:'0%'}}>
        <button
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid #ccc',
            padding: '10px 20px',
            fontSize: '14px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => setActiveStep(0)} // Optionally, reset step to 0
        >
          Cancel
        </button>
        <button
          style={{
            backgroundColor: '#ffc677',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '14px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => window.location.href = "../booked"}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Reserv2;
