import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from './Components/ErrorBoundary/errorBoundary';
import FallbackUI from './Components/ErrorBoundary/FallbackUI/fallbackUI';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary fallbackUI={<FallbackUI />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </QueryClientProvider>
);


reportWebVitals();
