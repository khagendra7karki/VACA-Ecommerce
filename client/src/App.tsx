import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Signin} from './pages/authentication/Signin'
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

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  
  return (
    <div >
      <Provider store={store}>
      <MantineProvider theme={theme}>
    <Notifications />
    <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              {/* <Route path="/profile" element={<Shop />} /> */}
              <Route index element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<Product />} />
              </Routes></BrowserRouter>
    </MantineProvider>
      </Provider>
     
     
    </div>
  );
}

export default App;
