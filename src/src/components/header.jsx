import React from 'react';
import { Link } from 'react-router-dom';

// Import the logo image
import zzzzbnImage from '../assets/images/zzzzbn.png'; // Adjust the path based on your folder structure

const Header = () => {
  const headerStyle = {
    backgroundColor: '#111',
    color: '#fff',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const logoStyle = {
    color: '#fff',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const navStyle = {
    display: 'flex',
    gap: '30px',
  };

  const buttonStyle = {
    color: '#fff',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.1rem',
    padding: '10px',
    borderRadius: '5px',
    letterSpacing: '1px',
  };

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '25px',
    padding: '8px 15px',
    width: '300px',
    maxWidth: '500px',
  };

  const inputStyle = {
    color: '#fff',
    backgroundColor: 'transparent',
    border: 'none',
    padding: '5px 10px',
    outline: 'none',
    width: '100%',
    fontSize: '1rem',
  };

  const searchIconStyle = {
    color: '#fff',
    marginRight: '12px',
    fontSize: '1.3rem',
  };

  return (
    <div style={headerStyle}>
      <Link to="/" style={logoStyle}>
        {/* Use the imported logo image */}
        <img
          src={zzzzbnImage} // Use the imported image variable here
          alt="Logo"
          style={{ width: '40px', height: 'auto' }}
        />
        FAR Platform
      </Link>
      <div style={navStyle}>
        <button style={buttonStyle}>Dashboard</button>
        <button style={buttonStyle}>Asset Management</button>
        <button style={buttonStyle}>Subscription</button>
        <button style={buttonStyle}>Support</button>
      </div>
      <div style={searchContainerStyle}>
        <i className="fa fa-search" style={searchIconStyle}></i>
        <input
          type="text"
          placeholder="Search Assets"
          style={inputStyle}
        />
      </div>
    </div>
  );
};

export default Header;
