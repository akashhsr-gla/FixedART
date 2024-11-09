import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // React Router's useNavigate hook

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Send the file to the backend API
      const response = await axios.post('http://localhost:8000/api/assets/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Check if the response has data and assets
      if (response.data.savedAssets) {
        setMessage('Upload successful!');
        
        // Redirect to the assets page after successful upload
        navigate('/assets');
      } else {
        setMessage('No assets found in the file');
      }
    } catch (error) {
      setMessage('Error uploading file');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>Upload Excel File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadExcel;
