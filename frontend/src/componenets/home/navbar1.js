import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  // State to track user login status and user data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Simulate fetching user data (replace with actual API call or context)
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // Example: check localStorage or auth context
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUserName(loggedInUser.name); // Adjust key as per your data structure
    }
  }, []);

  const handleLogout = () => {
    // Clear user data on logout
    localStorage.removeItem('loggedInUser'); // Or clear relevant auth context
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

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '2%',
  };

  const logoImageStyles = {
    width: '100%',
    height: '45px',
  };

  const searchWrapperStyles = {
    position: 'relative',
  };

  const searchStyles = {
    padding: '10px 10px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    fontSize: '14px',
    width: '300px',
    backgroundColor: '#ede7e3',
    paddingRight: '30px', // Space for the icon
    paddingLeft: '10px',
  };

  const searchIconStyles = {
    position: 'absolute',
    right: '7px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: '#023047',
  };

  const linksStyles = {
    listStyle: 'none',
    display: 'flex',
    gap: '30px',
    margin: 0,
    padding: 0,
    marginLeft: isLoggedIn ? '-12%' : '0',
  };

  const linkStyles = {
    textDecoration: 'none',
    color: '#023047',
    fontSize: '16px',
    transition: 'color 0.3s ease',
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
   const welcomemessage ={
    color: '#023047', /* Tomato color */
    position:'absolute',
    right:'9%',
    fontsize: '20px',
    fontweight: 'bold',
  }
  
  return (
    <nav style={navbarStyles}>
      {/* Logo Section */}
      <div style={logoStyles}>
        <img src="./images/logo_seul.png" alt="Lodgini logo" style={logoImageStyles} />
      </div>

      {/* Search Bar Section */}
      <div style={searchWrapperStyles}>
        <input type="text" placeholder="Search by name" style={searchStyles} />
        <SearchIcon style={searchIconStyles} />
      </div>

      {/* Navigation Links */}
      <ul style={linksStyles}>
        <li>
          <a
            href="/"
            style={linkStyles}
            onMouseEnter={(e) => (e.target.style.color = '#82c0cc')}
            onMouseLeave={(e) => (e.target.style.color = '#023047')}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#profile"
            style={linkStyles}
            onMouseEnter={(e) => (e.target.style.color = '#82c0cc')}
            onMouseLeave={(e) => (e.target.style.color = '#023047')}
          >
            Profile
          </a>
        </li>
        <li>
          <a
            href="/about"
            style={linkStyles}
            onMouseEnter={(e) => (e.target.style.color = '#82c0cc')}
            onMouseLeave={(e) => (e.target.style.color = '#023047')}
          >
            About Us
          </a>
        </li>
        <li>
          <a
            href="#footer"
            style={linkStyles}
            onMouseEnter={(e) => (e.target.style.color = '#82c0cc')}
            onMouseLeave={(e) => (e.target.style.color = '#023047')}
          >
            Contact Us
          </a>
        </li>
      </ul>

      {/* Conditional Buttons Section */}
      <div style={actionsStyles}>
        {isLoggedIn ? (
          <>
           <span style={welcomemessage}>
              Welcome, {userName} !
            </span>
            <button
        style={{
          padding: '8px 15px',
          fontSize: '14px',
          color: '#ede7e3',
          backgroundColor: '#16697a',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginLeft:'0%',
          transition: 'background-color 0.3s ease',
        }}
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
