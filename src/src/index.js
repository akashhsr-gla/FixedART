import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

ReactDOM.render(
  <Router> {/* Wrap your app with Router */}
    <App />
  </Router>,
  document.getElementById('root')
);
