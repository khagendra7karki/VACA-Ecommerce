/**
 * TODO
 * optimize the code
 * 
 * addToCart can receive the product info from the 
 * frontend iteself. Request for product need not be 
 * made
 */

import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions/index";
import { store } from "../store";
import { stringify } from "querystring";

import createNewUser from "../../firebase/createNewUser";




export const addToCart = (id: string, qty: number) => {
  return async (dispatch: Dispatch<Action>, getState: any) => {
    
    const { data } = await axios.get(`http://localhost:5000/getProduct/${id}`);
    const product = {
      product: data.payload._id,
      title: data.payload.title,
      image: data.payload.image,
      price: data.payload.price,
      availableQuantity: data.payload.availableQuantity,
      quantity: qty,
    }
    dispatch({
      type: ActionType.CART_ADD_ITEM,
      payload: product
    });
    
  
    const token = store.getState().userLogin.userInfo.token;

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

    const res = await axios.post(`http://localhost:5000/cart/addItem/${id}/${qty}`,{},config );

    console.log( res.data.payload );
    
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const removeFromCart = (id: string) => {
  return async (dispatch: Dispatch<Action>, getState: any) => {
    const token = store.getState().userLogin.userInfo.token;

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

    const { data } = await axios.post(`http://localhost:5000/cart/removeItem/${id}`,{},config );
    console.log( data.payload );

    dispatch({
      type: ActionType.CART_REMOVE_ITEM,
      payload: id,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const saveShippingAddress = (data: any) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CART_SAVE_SHIPPING_ITEM,
      payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };
};

export const savePaymentMethod = (data: any) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CART_SAVE_PAYMENT_ITEM,
      payload: data,
    });

    localStorage.setItem("paymentMethod", JSON.stringify(data));
  };
};

export const getProducts = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.GET_PRODUCTS_REQUEST,
      });

      const { data } = await axios.get(`http://localhost:5000/getProducts`);
// console.log('kkkkkk',data)
      dispatch({
        type: ActionType.GET_PRODUCTS_SUCCESS,
        payload: data.payload,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.GET_PRODUCTS_FAIL,
        payload: error,
      });
    }
  };
};

export const quickSearchProducts = (keyword: number) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.QUICK_SEARCH_REQUEST,
      });

      const { data } = await axios.get(
        `/api/v1/products/search?keyword=${keyword}`
      );

      dispatch({
        type: ActionType.QUICK_SEARCH_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.QUICK_SEARCH_FAIL,
        payload: error,
      });
    }
  };
};

export const getProduct = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.GET_PRODUCT_REQUEST,
      });
   
      const { data } = await axios.get(`http://localhost:5000/getProduct/${id}`);
// console.log(data,"kkkkkkkkkkkkk", id, data.payload)
      dispatch({
        type: ActionType.GET_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.GET_PRODUCT_FAIL,
        payload: error,
      });
    }
  };
};

export const addReview = (id: string, rating: number, comment: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.ADD_REVIEW_REQUEST,
      });

      const token = store.getState().userLogin.userInfo.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `/api/v1/products/${id}/reviews`,
        { rating, comment },
        config
      );

      dispatch({
        type: ActionType.ADD_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.ADD_REVIEW_FAIL,
        payload: error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
};

export const register = (fullName: string, email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const formData = {  
        fullName,
        email,
        password,
      };

      // create a new user using the 
      // firebase SDK
      createNewUser( email, password, ( userCredential  ) =>{

        const { uid, email, accessToken } = userCredential
        const user = { fullName, uid, email, password, accessToken }

        console.log( user );
        
        axios.post("http://localhost:5000/registerUser", user , config)
        .then( res =>{
          console.log( 'Payload', res.data.payload )
          dispatch({
              type: ActionType.USER_REGISTER_SUCCESS,
              payload: res.data.payload,
            });

            dispatch({
              type: ActionType.USER_LOGIN_SUCCESS,
              payload: res.data.payload,
            });
      
            localStorage.setItem("userInfo", JSON.stringify(res.data.payload ));
            })
      })


    } catch (error: any) {
      dispatch({
        type: ActionType.USER_REGISTER_FAIL,
        payload: error,
      });
    }
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.USER_LOGIN_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const formData = {
        email,
        password,
      };

      const { data } = await axios.post(
        "http://localhost:5000/login",
        formData,
        config
      );

      //extract user data from the 
      // response payload
      const { cart, wishList, ...user } = data.payload 
      
      const cartItems = cart?.items?.map( (item: any) =>{
        return {
          product: item._id, 
          title: item.title,
          image: '',
          price: '',
          availableQuantity: '',
          qty: ''
        }
      })
      

      // add userInfo to 
      // redux store
      dispatch({
        type: ActionType.USER_LOGIN_SUCCESS,
        payload: user,
      });
      
      // add cart data to 
      // redux store
      dispatch({
        type: ActionType.CART_ADD_ITEM,
        payload: cart,
      })


      console.log( 'login response payload', data )
      
      //add 
      localStorage.setItem("userInfo", JSON.stringify( user ));

    } catch (error: any) {
      console.log( error )
      dispatch({
        type: ActionType.USER_LOGIN_FAIL,
        payload: error,
      });
    }
  };
};

export const createOrder = (
  orderItems: any,
  shippingAddress: any,
  paymentMethod: string,
  itemsPrice: any,
  taxPrice: any,
  shippingPrice: any,
  totalPrice: any
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.CREATE_ORDER_REQUEST,
      });

      const token = store.getState().userLogin.userInfo.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      };
      let _id : any = "65386caaf5f81f2689e95abb"
      //     const { data } = await axios.post("/api/v1/orders", formData, config);
      const data = {orderItems :orderItems,
        shippingAddress :shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice :itemsPrice,
        taxPrice :taxPrice,
        shippingPrice :shippingPrice,
        totalPrice : totalPrice,
        _id
      }
 
      dispatch({
        type: ActionType.CREATE_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.CREATE_ORDER_FAIL,
        payload: error,
      });
    }
  };
};

export const getOrder = (id: any) => {
  return async (dispatch: Dispatch<Action>, getState: any) => {
    try {
      dispatch({
        type: ActionType.GET_ORDER_REQUEST,
      });

      const token = store.getState().userLogin.userInfo.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

     // const { data } = await axios.get(`/api/v1/orders/${id}`, config);


      const data = {
        isPaid: true,
        user: {
          name: "dk",
          email: "njdnck",
        },
        paymentMethod: "admnd",
        orderItems: {},
        isDelivered: false,
        shippingAddress: {
          address: "cdadc",
          city: "casdac",
          postalCode: "cadca",
          country: "cadca",
        },
      };
      dispatch({
        type: ActionType.GET_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.GET_ORDER_FAIL,
        payload: error,
      });
    }
  };
};

export const payOrder = (id: any, paymentResult: any) => {
  return async (dispatch: Dispatch<Action>, getState: any) => {
    try {
      dispatch({
        type: ActionType.ORDER_PAY_REQUEST,
      });

      const token = store.getState().userLogin.userInfo.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // const { data } = await axios.put(
      //   `/api/v1/orders/${id}/pay`,
      //   paymentResult,
      //   config
      // );
const data = {}
      dispatch({
        type: ActionType.ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.ORDER_PAY_FAIL,
        payload: error,
      });
    }
  };
};

export const getUser = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.GET_USER_REQUEST,
      });

      const token = store.getState().userLogin.userInfo.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/v1/users`, config);

      dispatch({
        type: ActionType.GET_USER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.GET_USER_FAIL,
        payload: error,
      });
    }
  };
};

export const getOrders = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.GET_ORDERS_REQUEST,
      });

      const token = store.getState().userLogin.userInfo.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/v1/orders`, config);

      dispatch({
        type: ActionType.GET_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.GET_ORDERS_FAIL,
        payload: error,
      });
    }
  };
};

export const deliverOrder = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.ORDER_DELIVER_REQUEST,
      });

      const token = store.getState().userLogin.userInfo.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `/api/v1/orders/${id}/deliver`,
        {},
        config
      );

      dispatch({
        type: ActionType.ORDER_DELIVER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.ORDER_DELIVER_FAIL,
        payload: error,
      });
    }
  };
};

export const createProduct = (
  name: string,
  price: number,
  image: string,
  brand: string,
  category: string,
  countInStock: number,
  numReviews: number,
  description: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.CREATE_PRODUCT_REQUEST,
      });

      const token = store.getState().userLogin.userInfo.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        numReviews,
        description,
      };

      const { data } = await axios.post(`/api/v1/products`, formData, config);

      dispatch({
        type: ActionType.CREATE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.CREATE_PRODUCT_FAIL,
        payload: error,
      });
    }
  };
};

export const getTopProducts = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.GET_TOP_PRODUCTS_REQUEST,
      });

      const { data } = await axios.get(`/api/v1/products/top`);

      dispatch({
        type: ActionType.GET_TOP_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.GET_TOP_PRODUCTS_FAIL,
        payload: error,
      });
    }
  };
};

export const getMyOrders = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.GET_MY_ORDERS_REQUEST,
      });

      const token = store.getState().userLogin.userInfo.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/v1/orders/myorders`, config);

      dispatch({
        type: ActionType.GET_MY_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.GET_MY_ORDERS_FAIL,
        payload: error,
      });
    }
  };
};

export const updateProfile = (
  name: string,
  email: string,
  password: string
) => {
  return async (dispatch: Dispatch<Action>, getState: any) => {
    try {
      dispatch({
        type: ActionType.UPDATE_PROFILE_REQUEST,
      });

      const token = store.getState().userLogin.userInfo.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = {
        name,
        email,
        password,
      };

      const { data } = await axios.put(
        `/api/v1/users/profile`,
        formData,
        config
      );

      dispatch({
        type: ActionType.UPDATE_PROFILE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: ActionType.UPDATE_PROFILE_RESET,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.UPDATE_PROFILE_FAIL,
        payload: error,
      });
    }
  };
};

export const updateUser = (id: string, isAdmin: boolean) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.UPDATE_USER_REQUEST,
      });

      const token = store.getState().userLogin.userInfo.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = {
        isAdmin,
      };

      const { data } = await axios.put(`/api/v1/users/${id}`, formData, config);

      dispatch({
        type: ActionType.UPDATE_USER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: ActionType.UPDATE_USER_RESET,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.UPDATE_USER_FAIL,
        payload: error,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch<Action>) => {

    //remove info from the cache

    localStorage.removeItem( "cartItems")
    localStorage.removeItem("paymentMethod")
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress")
    
    dispatch({ type: ActionType.USER_LOGOUT, payload: {} });
  };
};