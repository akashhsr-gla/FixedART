import React from 'react';

const Footer = () => {
  // Styles for the footer
  const footerStyle = {
    backgroundColor: '#111', // Dark background for a professional look
    color: '#fff',
    padding: '60px 0', // Increased padding for better spacing
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', // Responsive grid with flexible columns
    gap: '40px',
    justifyItems: 'center',
    textAlign: 'left',
    marginBottom: '30px', // Space between sections
  };

  const columnStyle = {
    minWidth: '220px',
    maxWidth: '300px',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#fff',
  };

  const linkStyle = {
    display: 'block',
    color: '#fff',
    textDecoration: 'none',
    marginBottom: '10px',
    fontSize: '1rem',
    fontWeight: '400',
    transition: 'color 0.3s ease',
  };

  const linkHoverStyle = {
    color: '#58A6FF', // Blue color for hover effect
  };

  const logoStyle = {
    width: '120px',
    marginBottom: '30px', // Add some space below the logo
    display: 'block',
  };

  // Return JSX
  return (
    <div style={footerStyle}>
      {/* Logo */}
      <div style={{ marginBottom: '40px' }}>
        <img
          src="/Users/akashsingh/Downloads/ffixed/src/src/assets/images/zzzzbn.png" // Correct path from the public folder (no need for /public)
          alt="Logo"
          style={logoStyle}
        />
      </div>

      {/* Footer Content */}
      <div style={gridStyle}>
        {/* Company Column */}
        <div style={columnStyle}>
          <h3 style={titleStyle}>Company</h3>
          <a href="#" style={linkStyle}>
            About Us
          </a>
          <a href="#" style={linkStyle}>
            Careers
          </a>
          <a href="#" style={linkStyle}>
            Press
          </a>
        </div>

        {/* Resources Column */}
        <div style={columnStyle}>
          <h3 style={titleStyle}>Resources</h3>
          <a href="#" style={linkStyle}>
            Privacy Policy
          </a>
          <a href="#" style={linkStyle}>
            Terms of Service
          </a>
          <a href="#" style={linkStyle}>
            Contact
          </a>
        </div>

        {/* Social Media Column */}
        <div style={columnStyle}>
          <h3 style={titleStyle}>Follow Us</h3>
          <a href="https://www.facebook.com" style={linkStyle}>
            Facebook
          </a>
          <a href="https://www.twitter.com" style={linkStyle}>
            Twitter
          </a>
          <a href="https://www.instagram.com" style={linkStyle}>
            Instagram
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={{ fontSize: '0.875rem', color: '#888' }}>
        <p>&copy; {new Date().getFullYear()} FAR Platform. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
