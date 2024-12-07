import React, { useState } from 'react';
import Navbar from '../home/navbar1';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Footer from '../home/footer';

const Booked = () => {
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
    <div style={{ backgroundColor: '#ede7e3', paddingBottom: '2px' }}>
      <Navbar />



      {/* Stepper */}
      <Box sx={{ width: '100%', padding: '20px 0', margin: '1% 0%', marginBottom: '3%', marginLeft: '30%', width: '40%' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel
                StepIconProps={{
                  style: {
                    color: '#43D649',
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
        <h2 style={{ color: '#023047', fontWeight: 'bold' }}>Yay! Payment Completed</h2>
      </div>
      {/* Logo centered */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <img
          src="../images/logo.png" // Replace with the actual logo URL
          alt="Brand Logo"
          style={{ width: '21%', height: '40%', objectFit: 'contain' }}
        />
      </div>


      {/* Center buttons */}
      <div style={{ display: 'flex', gap: '5%', marginTop: '30px', marginBottom: '30px', justifyContent: 'center', paddingBottom: '0%' }}>
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
          onClick={() => {
            window.location.href = '/';  // Replace YOUR_LINK_HERE with the destination URL
          }}
        >
          Go to Home page
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Booked;
