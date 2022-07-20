import React from 'react';
import ReactDOM from 'react-dom/client';
import './cssFolder/index.css';
import App from './App';
import reportWebVitals from './jsFolder/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
