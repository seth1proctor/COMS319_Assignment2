import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {app, cart, confirm} from './script.js';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <app />
    <cart />
    <confirm />
  </React.StrictMode>
);
