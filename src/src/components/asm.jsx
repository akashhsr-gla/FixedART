import React from 'react';
import { Link } from 'react-router-dom';
import { FaUpload, FaFileAlt, FaSearch, FaShoppingCart } from 'react-icons/fa';

const MyComp = () => {
  // Style for the dashboard container with elegant background
  const containerStyle = {
    padding: '40px',
    backgroundColor: '#f4f4f9', // Light background for a clean, corporate look
    background: 'linear-gradient(135deg, #f4f4f9 40%, #e0e0e0 100%)', // Elegant subtle gradient
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/coffee-lattice.png")', // Subtle texture
    backgroundSize: 'cover', // Cover the entire background
    backgroundPosition: 'center',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '40px',
    color: '#333',
    letterSpacing: '-0.5px',
  };

  const descriptionStyle = {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '40px',
    lineHeight: '1.6',
  };

  const featureListContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '30px',
    justifyItems: 'center',
    marginBottom: '40px',
  };

  const featureBoxStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '350px',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  };

  const iconStyle = {
    fontSize: '2.5rem',
    marginBottom: '15px',
    color: '#4A90E2', // Brand color
  };

  const featureTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
  };

  const featureDescriptionStyle = {
    color: '#666',
    fontSize: '1rem',
    lineHeight: '1.4',
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '12px 30px',
    backgroundColor: '#4A90E2',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    letterSpacing: '1px',
    transition: 'background-color 0.3s ease',
  };

  const linkStyle = {
    textDecoration: 'none',
  };

  return (
    <div style={containerStyle}>
      {/* Title */}
      <h1 style={titleStyle}>Fixed Asset Registration and Tracking</h1>

      {/* Description */}
      <p style={descriptionStyle}>
        Fixed Asset Registration and Tracking helps businesses manage their assets efficiently. 
        It ensures that every asset is properly registered and tracked throughout its lifecycle, 
        from acquisition to disposal. With this solution, you can easily upload asset data, 
        track asset performance, and generate reports.
      </p>

      {/* Feature Boxes */}
      <div style={featureListContainerStyle}>
        {/* Feature Box 1: Upload Assets */}
        <div style={featureBoxStyle}>
          <FaUpload style={iconStyle} />
          <h3 style={featureTitleStyle}>Upload Assets</h3>
          <p style={featureDescriptionStyle}>Upload asset data from Excel files for efficient management.</p>
          {/* Redirect to /upload page on click */}
          <Link to="/upload" style={linkStyle}>
            <button style={buttonStyle}>Upload Excel</button>
          </Link>
        </div>

        {/* Feature Box 2: Asset Dashboard */}
        <div style={featureBoxStyle}>
          <FaFileAlt style={iconStyle} />
          <h3 style={featureTitleStyle}>Asset Dashboard</h3>
          <p style={featureDescriptionStyle}>Access detailed analytics and insights on all your assets.</p>
          <Link to="/dashboard" style={linkStyle}>
            <button style={buttonStyle}>View Dashboard</button>
          </Link>
        </div>

        {/* Feature Box 3: Track Assets */}
        <div style={featureBoxStyle}>
          <FaSearch style={iconStyle} />
          <h3 style={featureTitleStyle}>Track Assets</h3>
          <p style={featureDescriptionStyle}>Track and monitor your assets in real-time.</p>
          <Link to="/track" style={linkStyle}>
            <button style={buttonStyle}>Start Tracking</button>
          </Link>
        </div>

        {/* Feature Box 4: Buy Tags */}
        <div style={featureBoxStyle}>
          <FaShoppingCart style={iconStyle} />
          <h3 style={featureTitleStyle}>Buy Tags</h3>
          <p style={featureDescriptionStyle}>Purchase asset tags for easy identification and tracking.</p>
          <Link to="/buy-tags" style={linkStyle}>
            <button style={buttonStyle}>Buy Tags</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyComp;
