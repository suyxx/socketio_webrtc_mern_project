import * as process from 'process';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import * as serviceWorker from './serviceWorker';

// Import createRoot from "react-dom/client"
import { createRoot } from 'react-dom/client';

(window).global = window;
(window).process = process;
(window).Buffer = [];

// Use createRoot to render the app
const root = document.getElementById('root');
createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
