import React from 'react';

const HeroSection = () => {
  // Styles
  const containerStyle = {
    backgroundImage: "url('https://yourimageurl.com/asset-management.jpg')",
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for better text visibility
    zIndex: 1,
  };

  const contentBoxStyle = {
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly darker background for contrast
    padding: '40px 50px',
    borderRadius: '15px',
    zIndex: 2,
    maxWidth: '600px', // Limit width for better readability
    margin: '0 auto',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)', // Soft shadow to elevate the box
  };

  const headingStyle = {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '20px',
    lineHeight: '1.3',
    letterSpacing: '-0.5px',
  };

  const subHeadingStyle = {
    fontSize: '1.25rem',
    fontWeight: '400',
    marginBottom: '30px',
    lineHeight: '1.6',
    opacity: 0.85,
  };

  const buttonStyle = {
    backgroundColor: '#1976d2',
    color: 'white',
    padding: '14px 30px',
    borderRadius: '30px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '20px',
    border: 'none',
    transition: 'all 0.3s ease',
    letterSpacing: '1px',
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
  };

  const buttonHoverStyle = {
    backgroundColor: '#1565c0',
    transform: 'translateY(-3px)', // Subtle hover effect to lift the button
  };

  const handleButtonHover = (e) => {
    e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
    e.target.style.transform = buttonHoverStyle.transform;
  };

  const handleButtonLeave = (e) => {
    e.target.style.backgroundColor = buttonStyle.backgroundColor;
    e.target.style.transform = 'translateY(0)';
  };

  // Return JSX
  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div> {/* Dark overlay for text contrast */}
      
      <div style={contentBoxStyle}>
        <h1 style={headingStyle}>Manage Your Assets Efficiently with FAR</h1>
        <p style={subHeadingStyle}>
          Track, organize, and generate reports for your assets, all in one place. Optimize your workflow today.
        </p>
        <button
          style={buttonStyle}
          onMouseOver={handleButtonHover}
          onMouseOut={handleButtonLeave}
        >
          Start Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
