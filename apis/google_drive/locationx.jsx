import React, { useState } from 'react';
import QRReader from 'react-qr-reader'; // QR Code Reader library
import axios from 'axios';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [location, setLocation] = useState(null);

  // Function to handle location tracking
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      }, (error) => {
        console.error('Error getting location: ', error);
        setLocation(null);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Handle QR code scan
  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      getLocation(); // Get location when QR code is scanned
    }
  };

  // Handle error during scanning
  const handleError = (err) => {
    console.error('Scan Error:', err);
  };

  // Send the scan result and location to the backend
  const sendScanData = async () => {
    if (scanResult && location) {
      try {
        await axios.post('http://localhost:8000/api/scan', {
          qrData: scanResult,
          latitude: location.latitude,
          longitude: location.longitude,
        });
        alert('Scan and location data sent successfully!');
      } catch (error) {
        console.error('Error sending data:', error);
        alert('Error sending scan data.');
      }
    } else {
      alert('Scan result or location not available.');
    }
  };

  return (
    <div>
      <h2>QR Scanner with Location Tracking</h2>
      <QRReader
        delay={300}
        style={{ width: '100%' }}
        onScan={handleScan}
        onError={handleError}
      />
      <div>
        {scanResult && (
          <div>
            <p>Scan Result: {scanResult}</p>
            {location && (
              <p>
                Location: Latitude {location.latitude}, Longitude{' '}
                {location.longitude}
              </p>
            )}
            <button onClick={sendScanData}>Send Data to Server</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
