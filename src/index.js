import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from './ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Auth from './Auth';




ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Auth>
        <App />
      </Auth>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById('root')
);

