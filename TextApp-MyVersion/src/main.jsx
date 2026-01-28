import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import StoreContextProvider from './contexts/ChatContext.jsx'
import Login from './pages/login/Login.jsx'
import Chat from './pages/chat/Chat.jsx'
import ProfileUpdate from './pages/profileUpdate/ProfileUpdate.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
