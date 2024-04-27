import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import { BrowserRouter as Router } from 'react-router-dom';
import { SettingsContextProvider } from './context/SettingsContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <SettingsContextProvider>
        <App />
      </SettingsContextProvider>
    </Router>
  </React.StrictMode>,
);
