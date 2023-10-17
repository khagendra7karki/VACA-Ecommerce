import React from 'react';
import logo from './logo.svg';
import './App.css';
import {HeaderSearch} from './components/Header'
import Products from './components/Products'
import { Footer } from './components/Footer';


function App() {
  return (
    <div >
     <HeaderSearch/>
     <Products/>
     <Footer/>
    </div>
  );
}

export default App;
