import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "@appwrite.io/pink-icons";
import App from './App.jsx';
import { AuthProvider } from './utils/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
      <App />
    </AuthProvider>
  </StrictMode>
);
