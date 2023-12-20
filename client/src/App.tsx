import React from 'react';
import Login from './pages/Login'
import { Signup } from './pages/SignUp'
import Home from './pages/Home'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import { Container, MantineProvider, createTheme, rem } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from "./state/index";
import Cart from './pages/Cart/Cart';
import Product from './pages/Product/Product';
import app from './firebase';
import { ContactUs } from './pages/Contact/ContactUs';
import Order from './pages/Order';
import User from './pages/User';
import UserProfile from './pages/User/UserProfile';
import MyWishList from './pages/User/MyWishList';
import MyCart from './pages/User/MyCart';
import MyReviews from './pages/User/MyReviews';
import Layout from './components/Layout/Layout';
import Test from './pages/Test';
import WishList from './pages/WishList';
import EsewaSuccess from './pages/Checkout/Payment/Esewa/EsewaSuccess';
import EsewaFailed from './pages/Checkout/Payment/Esewa/EsewaFailed';
import AllInOne from './pages/Checkout';
import Admin from './pages/Admin';
import Search from './pages/Search';


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

const Root = () => {
  return <>
    <Layout>
      <Container size="xxxl">
        <Outlet />
      </Container>
    </Layout>
  </>
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: '/search', element: <Search />},
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "contact", element: <ContactUs /> },
      { path: "cart", element: <Cart /> },
      { path: "wishlist", element: <WishList /> },
      { path: "product/:id", element: <Product /> },
      { path: "order/:order", element: <Order /> },
      { path: 'checkout', element :<AllInOne />},
      { path: "esewa_payment_success", element: <EsewaSuccess /> },
      { path: "esewa_payment_failed", element: <EsewaFailed /> },
      {
        path: "user/:id",
        element: <User />,
        children: [
          { path: "myProfile", element: <UserProfile /> },
          { path: "addressBook" },
          { path: "myReturns", element: <UserProfile /> },
          { path: "myCancellation", element: <UserProfile /> },
          { path: "myReviews", element: <MyReviews /> },
          { path: "myWishlist", element: <MyWishList /> },
          { path: "myCart", element: <MyCart /> }
        ]
      },
      { path: "test", element: <Test /> },
    ]
  },
  { path : 'admin',
    element: <Admin />,
    children: [
      // {path: '/', elemen}
    ]},
]);

function App() {
  /**
   * assigning import 'app'
   * to apps so that the module is 
   * executed which initializes firebase
   * 
   * Do not delete this line
   */
  const apps = app;

  return (
    <div >
      <Provider store={store} >
        <MantineProvider theme={theme}>
          <Notifications />
          <RouterProvider router={router} />
        </MantineProvider>
      </Provider>
    </div>
  );
}

export default App;
