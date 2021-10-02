import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import App from './App';
import './css/index.css';
import reportWebVitals from './reportWebVitals';

Axios.defaults.baseURL = 'https://morning-mountain-88083.herokuapp.com/api/';
Axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
