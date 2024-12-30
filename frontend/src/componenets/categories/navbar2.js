import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const location = useLocation();

  // Preserve existing login effect
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUserName(loggedInUser.name);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }

    // Add URL parameter for the search
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('name', searchQuery);
    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
    window.history.pushState({}, '', newUrl);
  };


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
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    paddingRight: '30px', // Space for the icon
    paddingLeft: '10px',
  };

  const searchIconStyles = {
    position: 'absolute',
    right: '7px', // Position the icon to the right side
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
    color: 'white',
    backgroundColor: '#16697a',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const loginButtonStyles = {
    ...buttonStyles,
    color: '#16697a',
    backgroundColor: 'white',
    padding: '8px 15px',
    fontSize: '14px',
    border: '1% solid #16697a',
  };

  const welcomeMessageStyles = {
    color: '#023047',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  return (
    <nav style={navbarStyles}>
      {/* Logo Section */}
      <div style={logoStyles}>
        <a href="/">
          <img src="./images/logo_seul.png" alt="Lodgini logo" style={logoImageStyles} />
        </a>
      </div>

      {/* Search Bar Section */}
      <form onSubmit={handleSearch} style={searchWrapperStyles}>
        <input
          type="text"
          placeholder="Search by name"
          style={searchStyles}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          style={{
            position: 'absolute',
            right: '7px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <SearchIcon style={searchIconStyles} />
        </button>
      </form>

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
            href="/profile"
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
            <span style={welcomeMessageStyles}>Welcome, {userName}!</span>
            <button
              style={buttonStyles}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#0f4c59')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#16697a')}
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
              style={loginButtonStyles}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#f5efeb')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'white')}
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
