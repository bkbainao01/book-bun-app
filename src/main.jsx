import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './i18n'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter basename={"/book-bun-app/"}>
      <App />
    </BrowserRouter>
  // </StrictMode>
)
