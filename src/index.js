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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
