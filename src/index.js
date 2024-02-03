import React from 'react';
import ReactDOM from 'react-dom/client';

import 'pace-js'
import 'pace-js/themes/yellow/pace-theme-minimal.css'

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);