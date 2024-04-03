import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {browse} from './script.js';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <browse />
  </React.StrictMode>
);
