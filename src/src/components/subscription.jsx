import React, { useEffect, useState } from 'react';
import { FaFileAlt } from 'react-icons/fa'; // Assets icon

const SubscriptionSection = () => {
  // Set up the background slideshow
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);
  const images = [
    'url(https://via.placeholder.com/1600x900?text=Asset+Management+1)',
    'url(https://via.placeholder.com/1600x900?text=Asset+Management+2)',
    'url(https://via.placeholder.com/1600x900?text=Asset+Management+3)',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    padding: '80px 20px',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundImage: images[backgroundImageIndex], // Background slideshow
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background-image 1s ease-in-out',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '40px',
    letterSpacing: '-0.5px',
  };

  const boxStyle = {
    textAlign: 'center',
    padding: '40px 30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '0 auto',
    transition: 'transform 0.3s ease-in-out',
  };

  const boxHoverStyle = {
    transform: 'translateY(-5px)',
  };

  const subtitleStyle = {
    fontSize: '1.5rem',
    fontFamily: 'Arial, sans-serif', // Arial font for the subtitle
    fontWeight: 400,
    color: '#495057',
    marginBottom: '15px',
    display: 'inline-block',
  };

  const signInButtonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'background-color 0.3s, transform 0.2s ease-in-out',
    letterSpacing: '0.5px',
    marginLeft: '15px', // Space between the text and button
  };

  const signInButtonHoverStyle = {
    backgroundColor: '#0056b3',
    transform: 'translateY(-3px)',
  };

  const handleSignInMouseOver = (e) => {
    e.target.style.backgroundColor = signInButtonHoverStyle.backgroundColor;
    e.target.style.transform = signInButtonHoverStyle.transform;
  };

  const handleSignInMouseOut = (e) => {
    e.target.style.backgroundColor = signInButtonStyle.backgroundColor;
    e.target.style.transform = 'translateY(0)';
  };

  // Upgrade Now button styling
  const upgradeButtonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '14px 30px',
    borderRadius: '30px',
    fontSize: '1.2rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s ease-in-out',
    letterSpacing: '0.5px',
    marginTop: '20px', // Space above the button
  };

  const upgradeButtonHoverStyle = {
    backgroundColor: '#0056b3',
    transform: 'translateY(-3px)',
  };

  const handleUpgradeMouseOver = (e) => {
    e.target.style.backgroundColor = upgradeButtonHoverStyle.backgroundColor;
    e.target.style.transform = upgradeButtonHoverStyle.transform;
  };

  const handleUpgradeMouseOut = (e) => {
    e.target.style.backgroundColor = upgradeButtonStyle.backgroundColor;
    e.target.style.transform = 'translateY(0)';
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Manage Your Subscription</h1>

      <div
        style={boxStyle}
        onMouseEnter={(e) => e.currentTarget.style.transform = boxHoverStyle.transform}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <h3 style={subtitleStyle}>Current Plan: Sign In</h3>
        <button
          style={signInButtonStyle}
          onMouseOver={handleSignInMouseOver}
          onMouseOut={handleSignInMouseOut}
        >
          Sign In
        </button>

        <p style={{ fontSize: '1rem', color: '#6c757d', marginTop: '20px', lineHeight: '1.6' }}>
          Unlock premium features including advanced asset management and tag generation with an upgrade to our Premium plan.
        </p>

        <button
          style={upgradeButtonStyle}
          onMouseOver={handleUpgradeMouseOver}
          onMouseOut={handleUpgradeMouseOut}
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default SubscriptionSection;
