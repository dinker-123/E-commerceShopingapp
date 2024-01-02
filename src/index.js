import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

console.log("in index.js");
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastContainer autoClose={1000} />
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
