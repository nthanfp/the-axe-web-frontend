import React from 'react';
import ReactDOM from 'react-dom/client';

// jQuery
import $ from 'jquery';

// Pace JS
import 'pace-js'
import 'pace-js/themes/purple/pace-theme-minimal.css'

// Datatables
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net-dt/js/dataTables.dataTables.min.js';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);