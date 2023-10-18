import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Signin} from './components/Signin'
import {Signup} from './components/Signup'
import Home from './components/Home'
import { useLoaderData } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from './components/Shop';


function App() {
  
  return (
    <div >
     <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              {/* <Route path="/profile" element={<Shop />} /> */}
              <Route index element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              </Routes></BrowserRouter>
    </div>
  );
}

export default App;
