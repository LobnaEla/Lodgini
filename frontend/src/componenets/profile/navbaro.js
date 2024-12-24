import React, { useState, useEffect } from 'react';

const Navbar = () => {
  // State to track user login status and user data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Check if the owner is logged in
  useEffect(() => {
    const loggedInOwner = JSON.parse(localStorage.getItem('loggedInOwner')); // Fetch from localStorage
    if (loggedInOwner) {
      setIsLoggedIn(true);
      setUserName(loggedInOwner.name); // Adjust key based on your stored data structure
    }
  }, []);

  const handleLogout = () => {
    // Clear user data on logout
    localStorage.removeItem('loggedInOwner'); // Or clear relevant auth context
    setIsLoggedIn(false);
    setUserName('');
    window.location.href = '/'; // Redirect to home or login page
  };

  const navbarStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1% 3%',
    backgroundColor: '#ead2ac',
    fontFamily: "'Arial', sans-serif",
  };

  const actionsStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  };

  const buttonStyles = {
    padding: '8px 15px',
    fontSize: '14px',
    color: '#ede7e3',
    backgroundColor: '#16697a',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const welcomemessage = {
    color: '#023047', /* Tomato color */
    position: 'absolute',
    right: '9%',
    fontsize: '20px',
    fontweight: 'bold',
  };

  return (
    <nav style={navbarStyles}>
      {/* Logo Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2%' }}>
        <img src="../images/logo_seul.png" alt="Lodgini logo" style={{ width: '100%', height: '45px' }} />
        <img src="../images/lodgini.png" alt="Lodgini logo" style={{ width: '100%', height: '30px', marginLeft: '20%' }} />
      </div>

      {/* Conditional Buttons Section */}
      <div style={actionsStyles}>
        {isLoggedIn ? (
          <>
            <span style={welcomemessage}>
              Welcome, {userName} !
            </span>
            <button
              style={buttonStyles}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              style={buttonStyles}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#0f4c59')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#16697a')}
              onClick={() => window.location.href = "../sign_up"}
            >
              Register
            </button>
            <button
              style={{ ...buttonStyles, color: '#16697a', backgroundColor: '#ede7e3' }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#b2b5b2')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#ede7e3')}
              onClick={() => window.location.href = "../sign_in"}
            >
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
