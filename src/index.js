import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './Context/AuthContext.';
import ChatProvider from './Context/ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ChatProvider>
      <App />
    </ChatProvider>
  </AuthProvider>
);