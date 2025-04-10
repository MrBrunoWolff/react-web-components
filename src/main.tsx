import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './colors.css'
import './styles/wc-theme.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
