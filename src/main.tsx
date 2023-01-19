import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ShowModalContextProvider } from './context/ShowModalContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ShowModalContextProvider>
      <App />
    </ShowModalContextProvider>
  </React.StrictMode>
);
