import React, { useState, useEffect } from 'react';
import Navbar from '../home/navbar1';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Footer from '../home/footer';
import { useParams } from 'react-router-dom'; 
import axios from 'axios'; 

const Reserv2 = () => {
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [cardNumber, setCardNumber] = useState('');
  const [bank, setBank] = useState('');
  const [expDate, setExpDate] = useState('');
  const [checkInDate, setCheckInDate] = useState(localStorage.getItem('checkInDate') ); 
  const [checkOutDate, setCheckOutDate] = useState(localStorage.getItem('checkOutDate')); 
  const { id, owner_id } = useParams();
  const [cvv, setCvv] = useState('');
  const [activeStep, setActiveStep] = useState(0); // Track the current step
  const [property, setProperty] = useState(null); // Property data state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    // Get the number of days from sessionStorage
    const storedTotalPrice = sessionStorage.getItem('TotalPrice');
    if (storedTotalPrice) {
      setTotalPrice(Number(storedTotalPrice)); // Ensure it's treated as a number
    }
  }, []);
  
  
  useEffect(() => {
    // Get the number of days from sessionStorage
    const storedNumberOfDays = sessionStorage.getItem('numberOfDays');
    if (storedNumberOfDays) {
      setNumberOfDays(Number(storedNumberOfDays)); // Ensure it's treated as a number
    }
    const storedCheckInDate = sessionStorage.getItem('checkInDate');
    if (storedCheckInDate) {
      setCheckInDate(Number(storedCheckInDate)); // Ensure it's treated as a number
    }
    const storedCheckOutDate = sessionStorage.getItem('checkOutDate');
    if (storedCheckOutDate) {
      setCheckOutDate(Number(storedCheckOutDate)); // Ensure it's treated as a number
    }
  }, []);
  
  const fetchPropertyDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/management/properties/${owner_id}/${id}`);
      setProperty(response.data);
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
  };

  // Simulate fetching user data (replace with actual API call or context)

  useEffect(() => {
    fetchPropertyDetails(); // Fetch property details when the component mounts
  }, []);
  
  // Steps for the Stepper
  const steps = ['Step 1', 'Step 2'];

  // Define the handleNext function
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1); // Increment activeStep by 1
  };
  
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUserID(loggedInUser.name); // Récupère l'ID de l'utilisateur depuis localStorage
    }
  }, []);

  const handleConfirmBooking = async () => {
    if (!userID) {
      console.log("User not logged in!");
      return; // Si l'utilisateur n'est pas connecté, empêcher la réservation
    }

    try {
     
      const bookingData = {
        checkInDate,
        checkOutDate,
        TotalPrice,
        owner_id,   
        property_id: id,
        user_id: 1,
      };
      console.log( bookingData);
      // Send POST request with axios
      const response = await axios.post(`http://localhost:8000/management/create_booking/${owner_id}/${id}/`, bookingData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Handle successful booking creation
        window.location.href = '../booked'; // Redirect to the booked page
      } else {
        alert('Failed to create booking');
      }
    } catch (error) {
      console.error('There was an error creating the booking:', error);
      alert('An error occurred while confirming the booking.');
    }
  };
  return (
    <div style={{ backgroundColor: '#ede7e3', paddingBottom: '2px' }}>
      <Navbar />

      {/* Stepper */}
      <Box sx={{ padding: '20px 0', margin: '1% 0%', marginBottom: '0', marginLeft: '30%', width: '40%' }}>
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
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: '20px', margin: '0 30%', marginBottom: '2%' }}>
        {/* Left part */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '-10px' }}>
          {/* Transfer Information */}
          <div style={{ textAlign: 'left', marginLeft: '3%' }}>
            <h3 style={{ color: '#023047', fontWeight: 'bold' }}>Transfer Lodgini:</h3>
            <p style={{ color: '#d69e66', fontSize: '14px', margin: '0 0' }}>
              {numberOfDays} {numberOfDays === 1 ? 'Day' : 'Days'} at {property ? property.name : 'Loading...'}
            </p>
            <p style={{ color: '#023047', fontWeight: 'bold' }}>Total: {TotalPrice} DT</p>
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
      <div style={{ display: 'flex', gap: '5%', marginTop: '30px', marginBottom: '30px', justifyContent: 'center', paddingBottom: '0%' }}>
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
          onClick={handleConfirmBooking}
        >
          Confirm Booking
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Reserv2;
