import React from 'react';
import ReactDOM from 'react-dom/client';
import Routing from './Routing';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/userContext';
import 'antd/dist/antd.css';
import './scss/main.scss';
import moment from 'moment';
moment.locale('es-mx');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <Routing/>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
