import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './components/Store/authSlice';
import AutoLogin from './components/Auth/AutoLogin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AutoLogin>
          <App />
        </AutoLogin>  
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

