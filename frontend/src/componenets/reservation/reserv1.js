import React, { useState } from 'react';
import Navbar from '../home/navbar1';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Footer from '../home/footer';

const Reserv1 = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [imageSrc] = useState('../images/vacation.jpg'); // Default image
  const totalPrice = 200; // Example dynamic price

  // Steps for the Stepper
  const steps = ['Step 1', 'Step 2'];

  return (
    <div style={{ backgroundColor: '#ede7e3' }}>
      <Navbar />

      {/* Stepper */}
      <Box sx={{ width: '100%', padding: '20px 0', margin: '1% 0%', marginBottom: '0', marginLeft: '30%', width: '40%' }}>
        <Stepper activeStep={0} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel
                StepIconProps={{
                  style: { color: '#d69e66', fontWeight: 'bold' },
                }}
              />
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Title and description */}
      <div style={{ textAlign: 'center', marginBottom: '2%', margintop: '0' }}>
        <h2 style={{ color: '#023047', fontWeight: 'bold' }}>Booking Information</h2>
        <p style={{ color: '#d69e66', fontSize: '16px' }}>
          Please take a moment to review and confirm your selections
        </p>
      </div>

      {/* Main container */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', margin: '0' }}>
        {/* Container with two sections */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '800px', marginBottom: '1%' }}>
          {/* Left part */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <img
              src={imageSrc}
              alt="Reservation Illustration"
              style={{
                maxWidth: '80%',
                height: 'auto',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            />

            {/* Maison Name and City */}
            <div style={{ textAlign: 'left', marginTop: '1%', marginLeft: '3%' }}>
              <h3 style={{ color: '#023047', fontWeight: 'bold' }}>Maison de Vacances</h3>
              <p style={{ color: '#d69e66', fontSize: '14px', margin: '0 0' }}>Tunis, Tunisia</p>
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

          {/* Right part */}
          <div style={{
            flex: 0.8,
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            marginTop: '-20px' // Adjust this value to move the section upwards
          }}>
            {/* Dates */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
              <div style={{ marginBottom: '10px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    marginBottom: '5px',
                    color: '#023047',
                  }}
                >
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
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
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    marginBottom: '5px',
                  }}
                >
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    fontSize: '14px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                />
              </div>
            </div>

            {/* Payment */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px' }}>
              <span style={{ color: '#d69e66' }}>You will pay:</span>
              <span style={{ color: '#023047', fontWeight: 'bold' }}>${totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Center buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '0px', marginBottom: '1%' }}>
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
            onClick={() => window.location.href = "../payment"}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Reserv1;
