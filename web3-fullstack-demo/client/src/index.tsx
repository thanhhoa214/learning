import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { TransactionProvider } from './context/TransactionContext';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <TransactionProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TransactionProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
