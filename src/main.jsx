import React from 'react';
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App.jsx';
import cart from './CartSlice.jsx';

const store = configureStore({ reducer: { cart } });
createRoot(document.getElementById('root')).render(
  <Provider store={store}><App /></Provider>
);
