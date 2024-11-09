// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing Router components
import Header from './components/header';
import Footer from './components/footer';
 // Import using lowercase
import SubscriptionSection from './components/subscription';
import HeroSection from './components/hero';
import UploadExcel from './components/uploadexcel'; 
import MyComp from './components/asm';
import AssetDashboard from './components/assetdashboard'; 

const App = () => {
  return (
     
      <div>
        <Header />
        <MyComp/>
        {/* Define the routes for your app */}
        <Routes>
        <Route path="/" element={<HeroSection />} />  {/* Main landing page */}
          <Route path="/upload" element={<UploadExcel />} />  {/* Upload page */}
          <Route path="/assets" element={<AssetDashboard />} />  
        </Routes>
        
        <SubscriptionSection />
        <HeroSection />
        <Footer />
      </div>
   
  );
};

export default App;
