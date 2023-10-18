import React from 'react';
import logo from './logo.svg';
import './App.css';
import {HeaderSearch} from './components/Header'
import Products from './components/Products'
import { Footer } from './components/Footer';
import { Divider } from '@mantine/core';
import { useLoaderData } from 'react-router-dom'


function App() {
  
  return (
    <div >
     <HeaderSearch/>
     <Divider my="sm" />
     <Products/>
     <Footer/>
    </div>
  );
}

export default App;
