import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginButton from './components/LoginButton.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <LoginButton />
    </GoogleOAuthProvider>
  </StrictMode>
)

