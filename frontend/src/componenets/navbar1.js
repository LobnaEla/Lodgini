import React from 'react';

const Navbar = () => {
  const navbarStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f8f8f8',
    borderBottom: '1px solid #ddd',
    fontFamily: "'Arial', sans-serif",
  };

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const logoImageStyles = {
    width: '40px',
    height: '40px',
  };

  const logoTextStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  };

  const linksStyles = {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: 0,
    padding: 0,
  };

  const linkStyles = {
    textDecoration: 'none',
    color: '#333',
    fontSize: '16px',
    transition: 'color 0.3s ease',
  };

  const actionsStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  };

  const searchStyles = {
    padding: '5px 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    width: '200px',
  };

  const buttonStyles = {
    padding: '8px 15px',
    fontSize: '14px',
    color: 'white',
    backgroundColor: '#0077b6',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const loginButtonStyles = {
    ...buttonStyles,
    backgroundColor: '#00b4d8',
  };

  return (
    <nav style={navbarStyles}>
      {/* Logo Section */}
      <div style={logoStyles}>
        <img src="/logo.png" alt="Lodgini Logo" style={logoImageStyles} />
        <h1 style={logoTextStyles}>Lodgini</h1>
      </div>

      {/* Navigation Links */}
      <ul style={linksStyles}>
        <li>
          <a href="#home" style={linkStyles} onMouseEnter={(e) => (e.target.style.color = '#0077b6')} onMouseLeave={(e) => (e.target.style.color = '#333')}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" style={linkStyles} onMouseEnter={(e) => (e.target.style.color = '#0077b6')} onMouseLeave={(e) => (e.target.style.color = '#333')}>
            About Us
          </a>
        </li>
        <li>
          <a href="#contact" style={linkStyles} onMouseEnter={(e) => (e.target.style.color = '#0077b6')} onMouseLeave={(e) => (e.target.style.color = '#333')}>
            Contact Us
          </a>
        </li>
        <li>
          <a href="#profile" style={linkStyles} onMouseEnter={(e) => (e.target.style.color = '#0077b6')} onMouseLeave={(e) => (e.target.style.color = '#333')}>
            Profile
          </a>
        </li>
      </ul>

      {/* Search and Actions */}
      <div style={actionsStyles}>
        <input type="text" placeholder="Search by name" style={searchStyles} />
        <button
          style={buttonStyles}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#005f8c')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#0077b6')}
        >
          Register
        </button>
        <button
          style={loginButtonStyles}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#0096c7')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#00b4d8')}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
