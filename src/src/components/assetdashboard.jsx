import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssetDashboard = () => {
  const [assets, setAssets] = useState([]); // state to store asset data
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state to handle failures

  // Fetch asset data from the backend when the component mounts
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/assets');
        console.log('Assets fetched:', response.data); // Log the assets received from the backend
        if (response.data && response.data.savedAssets) {
          setAssets(response.data.savedAssets); // store the assets in state
        } else {
          setError('No assets data found.');
        }
        setLoading(false); // set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching assets:', error); // Log any error during the fetch
        setError('Failed to load assets'); // Set error message if fetching fails
        setLoading(false); // set loading to false on error
      }
    };

    fetchAssets();
  }, []); // Empty array ensures it runs once when the component mounts

  return (
    <div style={{ padding: '40px', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Asset Dashboard</h1>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading assets...</p>
      ) : error ? (
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p> // Display error if any
      ) : (
        <div style={{ textAlign: 'center' }}>
          {assets.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {assets.map((asset, index) => (
                <div key={index} style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                  <h3>Asset #{index + 1}</h3>
                  <p><strong>Name:</strong> {asset.assetData?.name || 'No Name Available'}</p>
                  <p><strong>ID:</strong> {asset.assetData?.id || 'No ID Available'}</p>
                  <p><strong>Description:</strong> {asset.assetData?.description || 'No Description Available'}</p>
                  <p><strong>PDF Path:</strong> <a href={asset.pdfPath} target="_blank" rel="noopener noreferrer">Download PDF</a></p>
                  <p><strong>QR Code Path:</strong> <a href={asset.qrCodePath} target="_blank" rel="noopener noreferrer">Download QR Code</a></p>
                </div>
              ))}
            </div>
          ) : (
            <p>No assets available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AssetDashboard;
