import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { HashRouter as Router } from "react-router-dom";
import './i18n'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Router>
      <App />
    </Router>
  // </StrictMode>
)
