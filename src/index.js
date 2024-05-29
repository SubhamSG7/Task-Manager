import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';
import TaskSlice from './TaskSlice';
import { configureStore } from '@reduxjs/toolkit';



const Store=configureStore({
  reducer:{tasks:TaskSlice}
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
    <App />
    </Provider>
  </React.StrictMode>
);