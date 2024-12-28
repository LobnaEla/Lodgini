import React, { useState } from 'react';
import Axios from 'axios';
import Navbar from '../home/navbar1';
import Footer from '../home/footer';

export const Signinowner = () => {
  // State to manage form data and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form is being submitted');

    // Clear previous errors
    setError('');

    try {
      // Make a POST request to Django API for login (Login as property owner)
      const response = await Axios.post(
        'http://localhost:8000/Sign_in_as_owner/', // URL for owner login endpoint
        {
          email,
          password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true // Include credentials for session management
        }
      );

      console.log(response);

      if (response.status === 200) {
        console.log('Login successful!');
        const userData = {
          name: response.data.name, // Adjust based on your API response structure
          id: response.data.id,
          email: email, // Assuming 'email' is available in your component
          phone_number: response.data.phone_number, // Assuming 'mobile' is part of the API response
          country: response.data.country,
          profile_picture: response.data.profile_picture,
          id: response.data.id // Assuming 'country' is part of the API response
        };
        localStorage.setItem('loggedInOwner', JSON.stringify(userData));
        setIsLoggedIn(true);
        setUserName(response.data.name);

        // Redirect to the homepage or owner dashboard after successful login
        window.location.href = '/property_owner_profile';

      } else {
        setError('Invalid login credentials.');
      }
    } catch (err) {
      if (err.response) {
        // If error response from the server
        setError(err.response.data.error || 'An error occurred. Please try again.');
      } else {
        // If no response (network issues, etc.)
        setError('Network error. Please check your connection.');
      }
    }
  };
  return (
    <div style={{ backgroundColor: '#ede7e3' }}>
      <Navbar />

      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Left side for image */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            height: '100%',
          }}
        >
          <img
            src="../images/woman_grey.png" // Image URL
            alt="Cover Image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: '0',
              left: '0',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '55%',
              left: '55%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '80%',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '15px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
            }}
          >
            <img
              src="../images/lodgini.png" // Logo URL
              alt="Site Logo"
              style={{
                maxWidth: '60%',
                height: 'auto',
              }}
            />
          </div>
        </div>

        {/* Right side for form */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            marginRight: '10%',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '20px',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h2 style={{ textAlign: 'center' }}>Login to Your Property Owner Account</h2>

            {error && (
              <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>
                {error}
              </p>
            )}

            <div style={{ marginBottom: '25px' }}>
              <label
                htmlFor="email"
                style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label
                htmlFor="password"
                style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#ffc677',
                border: 'none',
                color: 'white',
                fontSize: '16px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginBottom: '2%',
              }}
            >
              Login
            </button>

            <p style={{ textAlign: 'center', margin: '0', padding: '5px 0' }}>
              <a
                href="../sign_up"
                style={{ color: 'black', textDecoration: 'none', textDecoration: 'underline' }}
              >
                Create an Account
              </a>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signinowner;