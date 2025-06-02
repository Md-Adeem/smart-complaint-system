import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// ✅ Import BrowserRouter
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './utils/appStore.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ✅ Wrap App inside BrowserRouter */}
    <Provider store = {appStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
  
)
