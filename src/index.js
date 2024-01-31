import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './Components/ErrorBoundary/errorBoundary';
import FallbackUI from './Components/ErrorBoundary/FallbackUI/fallbackUI';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ErrorBoundary fallbackUI={<FallbackUI />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
);


reportWebVitals();
