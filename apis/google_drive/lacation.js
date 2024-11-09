const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // To handle CORS from the frontend

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/scanDataDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully!');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Define a schema for the scan data
const scanSchema = new mongoose.Schema({
  qrData: String,
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
});

const ScanData = mongoose.model('ScanData', scanSchema);

// API endpoint to handle scan data and location
app.post('/api/scan', async (req, res) => {
  try {
    const { qrData, latitude, longitude } = req.body;

    if (!qrData || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ message: 'Missing data' });
    }

    // Create a new scan data entry
    const newScanData = new ScanData({
      qrData,
      latitude,
      longitude,
    });

    // Save to MongoDB
    await newScanData.save();

    res.status(200).json({ message: 'Scan data saved successfully!' });
  } catch (error) {
    console.error('Error saving scan data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
