import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login'
import {Signup} from './pages/authentication/Signup'
import Home from './pages/Home'
import { useLoaderData } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from './components/Shop';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...
import { MantineProvider, createTheme } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from "./state/index";
import Cart from './pages/Cart';
import Product from './pages/Product';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import app from './firebase';

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  /**
   * assigning import 'app'
   * to apps so that the module is 
   * executed which initializes firebase
   * 
   * Donot delete this line
   */
 // const apps = app;
  
  
  return (
    <div >
      <Provider store={store} >
      <MantineProvider theme={theme}>
    <Notifications />
    <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* <Route path="/profile" element={<Shop />} /> */}
              <Route index element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<Product />} />
               <Route path="/shipping" element={<Shipping />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/placeorder" element={<PlaceOrder />} />
              <Route path="/order/:order" element={<Order />} />

              </Routes></BrowserRouter>
    </MantineProvider>
      </Provider>
     
     
    </div>
  );
}

export default App;
