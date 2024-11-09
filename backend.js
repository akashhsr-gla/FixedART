const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode');
const { PDFDocument: PDFLibDocument, rgb } = require('pdf-lib');
const { exec } = require('child_process');





const assetSchema = new mongoose.Schema({
  assetData: { type: Object },
  pdfPath: { type: String },
  qrCodePath: { type: String },
});

const Asset = mongoose.model('Asset', assetSchema);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/assetsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully!');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Template paths (adjust based on your folder structure)
const templatePaths = [
  path.join(__dirname, 'templates/template1.pdf'),
  path.join(__dirname, 'templates/template2.pdf'),
  path.join(__dirname, 'templates/template3.pdf'),
  path.join(__dirname, 'templates/template4.pdf'),
  path.join(__dirname, 'templates/template5.pdf'),
];
const qrCodesDir = path.join(__dirname, 'qrCodes');
const pdfsDir = path.join(__dirname, 'pdfs');

// Ensure directories exist
if (!fs.existsSync(qrCodesDir)) {
  fs.mkdirSync(qrCodesDir);
}

if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir);
}

// Function to generate QR code
const generateQRCode = async (data, primaryKeyValue) => {
  const qrCodePath = path.join(qrCodesDir, `${primaryKeyValue}.png`);
  await QRCode.toFile(qrCodePath, `https://yourdomain.com/${primaryKeyValue}`);
  return qrCodePath;
};

// Logo upload directory
const logosDir = path.join(__dirname, 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir);
}

// Logo upload endpoint
app.post('/api/assets/upload-logo', upload.single('logo'), (req, res) => {
  try {
    const logoPath = path.join(logosDir, 'uploaded_logo.png');
    fs.writeFileSync(logoPath, req.file.buffer);  // Save the uploaded logo file
    res.status(200).json({ message: 'Logo uploaded successfully!', logoPath });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading logo', error: error.message });
  }
});

// Function to generate PDF
const generatePDF = async (data, primaryKeyValue, templateIndex) => {
  const pdfPath = path.join(pdfsDir, `${primaryKeyValue}.pdf`);
  
  // Select template file
  const templatePath = templatePaths[templateIndex - 1];
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template ${templateIndex} not found.`);
  }

  const templateBuffer = fs.readFileSync(templatePath);
  const pdfDoc = await PDFLibDocument.load(templateBuffer);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Define PDF page dimensions and margins
  const pageHeight = firstPage.getHeight();
  const pageWidth = firstPage.getWidth();
  const marginTop = 50;
  const marginBottom = 50;
  const availableHeight = pageHeight - marginTop - marginBottom;

  // Calculate optimal font size and line height based on entries
  const entriesCount = Object.keys(data).length;
  let fontSize = 12; // Start with a default font size
  let lineHeight = availableHeight / entriesCount;

  // Load and draw logo if exists
  const logoPath = path.join(logosDir, 'uploaded_logo.png');
  let yPosition = pageHeight - marginTop; // Start y position from the top
  if (fs.existsSync(logoPath)) {
    const logoImage = await pdfDoc.embedPng(fs.readFileSync(logoPath));
    const logoWidth = 100;  // Adjust based on desired logo width
    const logoHeight = logoImage.height * (logoWidth / logoImage.width);

    // Center logo at the top of the page
    firstPage.drawImage(logoImage, {
      x: (pageWidth - logoWidth) / 2,
      y: yPosition - logoHeight,
      width: logoWidth,
      height: logoHeight,
    });

    // Adjust y position for text to start right below the logo
    yPosition -= logoHeight + 20;  // Add some padding below the logo
  }

  // Add text entries below the logo
  Object.entries(data).forEach(([key, value]) => {
    firstPage.drawText(`${key}: ${value}`, {
      x: 50,
      y: yPosition,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
    yPosition -= lineHeight;
  });

  // Save the PDF with overlayed data
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(pdfPath, pdfBytes);

  return pdfPath;
};

app.post('/api/assets/upload', upload.single('file'), async (req, res) => {
  try {
    const { template = 1 } = req.body;  // Default to template 1 if not specified

    if (template < 1 || template > 5) {
      return res.status(400).json({ message: 'Invalid template number. Choose between 1 and 5.' });
    }

    // Read the Excel file
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const assets = xlsx.utils.sheet_to_json(worksheet, { defval: null });

    if (assets.length === 0) {
      return res.status(400).json({ message: 'No data found in the uploaded file.' });
    }

    const savedAssets = [];

    for (const assetData of assets) {
      // Handle missing or null values by replacing with "n/a"
      const formattedAssetData = {};
      for (const [key, value] of Object.entries(assetData)) {
        formattedAssetData[key] = value !== null && value !== undefined ? value : 'n/a';
      }

      const primaryKeyValue = formattedAssetData[Object.keys(assetData)[0]] || 'n/a'; // No primary key needed

      // Generate PDF and QR code for each asset
      const pdfPath = await generatePDF(formattedAssetData, primaryKeyValue, template);
      const qrCodePath = await generateQRCode(formattedAssetData, primaryKeyValue);

      // Save asset data along with paths to database
      const newAsset = new Asset({
        assetData: formattedAssetData,
        pdfPath,
        qrCodePath
      });

      await newAsset.save();

      // Push the asset in the format that frontend expects
      savedAssets.push({
        assetData: newAsset.assetData,
        pdfPath: newAsset.pdfPath,
        qrCodePath: newAsset.qrCodePath
      });
    }

    // Send the response **only once**, after processing all assets
    res.status(201).json({ message: 'File processed successfully!', savedAssets });
  } catch (error) {
    console.error('Error while uploading file:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});


// Root route
app.get('/', (req, res) => {
  res.send('Fixed Asset Registration API is live!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Contact info
app.get('/contact', (req, res) => {
  res.json({
    whatsapp: 'whatsapp://send?phone=+1234567890',
    email: 'mailto:support@company.com',
    instagram: 'https://www.instagram.com/yourcompany'
  });
});
