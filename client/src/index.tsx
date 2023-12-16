import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// core styles are required for all packages
import './assets/styles/global.scss'



// disabling all console.log for production
if( process.env.NODE_ENV === 'production')
  console.log = () => {}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
   
      <App />
    
);