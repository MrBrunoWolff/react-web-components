import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@mrbrunowolff/react-web-components/styles/flexlayout-light.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
