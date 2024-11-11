import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import HomePage from './pages/HomePage/HomePage';
import { CertificateProvider } from './contexts/certificates';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <CertificateProvider>
      <HomePage />
    </CertificateProvider>
  </React.StrictMode>
);