// src/index.js (React 18)

import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// Create a root element for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
