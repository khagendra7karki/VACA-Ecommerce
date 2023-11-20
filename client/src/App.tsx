import React from 'react';
import Login from './pages/Login'
import {Signup} from './pages/SignUp'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import { Container, MantineProvider, createTheme, rem } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from "./state/index";
import Cart from './pages/Cart';
import Product from './pages/Product';
import app from './firebase';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import { ContactUs } from './pages/Contact/ContactUs';
import User from './pages/User';
import UserProfile from './pages/User/UserProfile';
import MyWishList from './pages/User/MyWishList';
import MyCart from './pages/User/MyCart';
import MyReviews from './pages/User/MyReviews';
import Layout from './components/Layout/Layout';
import Test from './pages/Test';


const CONTAINER_SIZES: Record<string, string> = {
  xxs: rem(300),
  xs: rem(400),
  sm: rem(500),
  md: rem(600),
  lg: rem(700),
  xl: rem(800),
  xxl: rem(1200),
  xxxl: rem(1600),
};

const theme = createTheme({
  fontFamily: 'Poppins, sans-sefif',
  components: {
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size': fluid
          ? '100%'
          : size !== undefined && size in CONTAINER_SIZES
          ? CONTAINER_SIZES[size]
          : rem(size),
        },
      }),
    }),
  },
});

  const Root = () =>{ 
    return <>
      <Layout>
        <Container size="xxxl">
          <Outlet />
        </Container>
      </Layout>
    </>
  }

function App() {
  /**
   * assigning import 'app'
   * to apps so that the module is 
   * executed which initializes firebase
   * 
   * Donot delete this line
   */
  const apps = app;
  
  
  return (
    <div >
      <Provider store={store} >
      <MantineProvider theme = { theme }>
        <Notifications />
        <BrowserRouter>
            <Routes>
              <Route path = '/' element = { <Root /> } >
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* <Route path="/profile" element={<Shop />} /> */}
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/placeorder" element={<PlaceOrder />} />
                <Route path="/order/:order" element={<Order />} />


                {/* User Routes */}
                
                <Route path = '/user/:id/' element = {< User /> } >

                  <Route path = 'myProfile' element = { <UserProfile /> } />
                  <Route path = 'addressBook'/>
                  <Route path = 'myReturns' element = { <UserProfile /> } />
                  <Route path = 'myCancellation' element = { <UserProfile /> } />
                  <Route path = 'myReviews' element = { <MyReviews /> } />
                  <Route path = 'myWishlist' element = { <MyWishList /> } />
                  <Route path = 'myCart' element = { <MyCart /> } />

                  
                </Route>

                <Route path = '/test' element = {<Test /> } />

              </Route>
              

            </Routes>
        </BrowserRouter>
      </MantineProvider>
    </Provider>
     
     
    </div>
  );
}

export default App;
