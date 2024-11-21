import React from 'react';
import Navbar from '../home/navbar1';
import Footer from '../home/footer';

export const Signupowner = () => {
  return (
    <div style={{ backgroundColor: '#ede7e3' }}>
      <Navbar />
      
      <div style={{ display: 'flex', height: '100vh', gap:'10%', marginBottom:'3%' }}>
        {/* Left side for image */}
        <div style={{
          flex: 1,
          position: 'relative',
          height: '100%',
        }}>
          {/* Cover image */}
          <img
            src="../images/woman_grey.png" // Replace with your image URL
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
          
          {/* Semi-transparent rectangle over image */}
          <div style={{
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
          }}>
            <img
              src="../images/lodgini.png" // Replace with your logo URL
              alt="Site Name"
              style={{
                maxWidth: '60%',
                height: 'auto',
              }}
            />
          </div>
        </div>

        {/* Right side for form */}
        <div style={{
          flex: 1,
          alignItems: 'center',
          padding: '1%',
          paddingTop:'0',
          marginleft: '1000%',
          position: 'relative',
          zIndex: 2,
        }}>
          <form style={{
            width: '100%',
            maxWidth: '350px',  // Réduit la largeur du formulaire
            padding: '20px',
            paddingTop:'0',
            margintop:'0',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <h2 style={{ textAlign: 'center' }}>Create Property 
            Owner Account</h2>

            {/* Name field */}
            <div style={{ marginBottom: '3%' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '1%', textAlign: 'left' }}>Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </div>

            {/* Email field */}
            <div style={{ marginBottom: '3%' }}>
              <label htmlFor="email" style={{ display: 'block', textAlign: 'left' }}>Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </div>

            {/* Phone Number field */}
            <div style={{ marginBottom: '3%' }}>
              <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Phone Number</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone number"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </div>

            {/* Country field */}
            <div style={{ marginBottom: '3%' }}>
              <label htmlFor="country" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Country</label>
              <input
                type="text"
                id="country"
                placeholder="Enter your country"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </div>

            {/* Username field */}
            <div style={{ marginBottom: '3%' }}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </div>

            {/* Password field */}
            <div >
              <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </div>

            {/* Terms and conditions text */}
            <p style={{ textAlign: 'center' }}>
              By signing up you agree to the{' '}
              <a href="/terms" style={{ color: '#16697a' }}>terms and conditions</a> of Lodgini.
            </p>

            {/* Register button */}
            <button type="submit" style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#ffc677',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}>
              Register
            </button>

           {/* Additional links */}
            <p style={{ textAlign: 'center', margin: '0', padding: '5px 0' }}>
              <a href="/Sign_in" style={{ color: 'black', textDecoration: 'none',textDecoration: 'underline' }}>Login</a>
            </p>
            
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Signupowner;
