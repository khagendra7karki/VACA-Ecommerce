import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions/index";
import { store } from "../store";
import createNewUser from "../../firebase/createNewUser";



/**
 * @description - Retrieves user cart from the database
 * 
*/
export const getWishList= () => {
  return async (dispatch: Dispatch<Action>, getState: any) => {
    try{
      const { isLoggedIn } = store.getState().userLogin;
      
      if( !isLoggedIn ) {
        return
      }
      
      const token = store.getState().user.userInfo.token;
      const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/wishList/getItem`, config);
        // console.log( data.payload )
        
        dispatch({
          type: ActionType.WISHLIST_SET,
        payload: data.payload
      })
    }catch( error ){
      //for errors
    }
    
  };
};

/**
 * Adds an item to the cart
 * by creating a whole new cart
 * received from the backend
 * 
 * @param id - product Id
 * @param qty - number of items
 */
export const addToWishList = (id: string) => {
  return async (dispatch: Dispatch<Action>, getState: any) => {
    try{
      const { isLoggedIn } = store.getState().userLogin;
      
      if( !isLoggedIn ) {
        return 
      } 
      
      const token = store.getState().user.userInfo.token;
      
      const existItem = store.getState().wishList.wishListItems.find(
        (x: any ) => x.product == id
      )
  
      if( existItem ){
        // notify
  
        return
      }
  
      const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
  
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/wishList/addItem/${id}`,{},config );
  
      dispatch({
        type: ActionType.WISHLIST_ADD_ITEM,
        payload: data.payload
      })

    }catch( error ){

    }
      
    
  };
};

export const removeFromWishList = (id: string) => {
  return async (dispatch: Dispatch<Action>, getState: any) => {

    try {
      
      const token = store.getState().user.userInfo.token;
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      
      const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/wishList/removeItem/${id}`,config );
      
      dispatch({
        type: ActionType.WISHLIST_SET,
        payload: data.payload,
      });

    } catch (error) {
      
    }
  };
};

export const clearWishList = () =>{
  return async( dispatch: Dispatch<Action> , getState: any ) => {
    dispatch({type: ActionType.WISHLIST_CLEAR_ITEMS})
  }
}
/**
 * @description - Retrieves user cart from the database
 * 
 */
export const getCart = () => {
  return async (dispatch: Dispatch<Action>, getState: any) => {

    try {
      
      const { isLoggedIn } = store.getState().userLogin;
  
      if( !isLoggedIn ){
        return
      }
  
      const token = store.getState().user.userInfo.token;
      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
  
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/cart/getItem`, config);
      
      console.log( data )
      dispatch({
        type: ActionType.CART_SET,
        payload: data.payload
      })

    } catch (error) {
      
    }

  };
};

/**
 * Adds an item to the cart
 * by creating a whole new cart
 * received from the backend
 * 
 * @param id - product Id
 * @param qty - number of items
 */
export const addToCart = (id: string, qty: number) => {
  return async (dispatch: Dispatch<Action>, getState: any) => {

    try {
      const token = store.getState().user.userInfo.token;
      if (!token ) return 
  
      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
      };
  
      let existItem: any = store.getState().cart.cartItems.find( 
        ( x: any ) => x.product == id
      )
      if( existItem ){
        //notify
  
        return
      }
  
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/cart/addItem/${id}/${qty}`,{},config );
      dispatch({
        type: ActionType.CART_ADD_ITEM,
        payload: data.payload
      })
      
    } catch (error) {
      
    }
    

  };
};

export const removeFromCart = (id: string) => {
  return async (dispatch: Dispatch<Action>, getState: any) => {
    try{
      const token = store.getState().user.userInfo.token;
  
      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/cart/removeItem/${id}`,{},config );
  
      dispatch({
        type: ActionType.CART_SET,
        payload: data.payload,
      });
      
    }catch( error ){

    }
  };
};

export const updateCart = ( id: string, qty : number ) =>{
  return async (dispatch: Dispatch<Action>, getState: any) => {
    try {
      const token = store.getState().user.userInfo.token;
  
      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
      };
    
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/cart/updateItem/${id}/${qty}`,{},config );
  
      dispatch({
        type: ActionType.CART_SET,
        payload: data.payload,
      });
      
    } catch (error) {
      
    }

  };

}

export const clearCart = () =>{
  return async( dispatch: Dispatch<Action> , getState: any ) => {
    dispatch({type: ActionType.CART_CLEAR_ITEMS})
  }
}

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

export const getProducts = (page: number) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.GET_PRODUCTS_REQUEST,
      });
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/product/getProducts?pageNumber=${page}`);
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
        `${process.env.REACT_APP_API_URL}/product/getProducts/search?keyword=${keyword}`
      );
      dispatch({
        type: ActionType.QUICK_SEARCH_SUCCESS,
        payload: data.payload,
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
   
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/product/getProduct/${id}`);

      dispatch({
        type: ActionType.GET_PRODUCT_SUCCESS,
        payload: data.payload,
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

      const {token, _id, fullName} = store.getState().user.userInfo;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };


      //make reivew object
      const reviewObject = {
        user: _id,
        review: comment,
        rating: rating,
        fullName
      }

      // receive the updated product info
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/review/addReview`,
        {   productId: id , review: reviewObject },
        config
      );
      dispatch({
        type: ActionType.ADD_REVIEW_SUCCESS,
        payload:data.payload 
      })

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

      // create a new user using the 
      // firebase SDK
      createNewUser( email, password, ( userCredential  ) =>{

        const { uid, email, accessToken } = userCredential
        const user = { fullName, uid, email, password, accessToken }

        axios.post(`${process.env.REACT_APP_API_URL}/user/registerUser`, user , config)
        .then( res =>{
          console.log( 'Payload', res.data.payload )
          
          // dispatch register action
          dispatch({
              type: ActionType.USER_REGISTER_SUCCESS,
            });

          // dispatch login action
          dispatch({
            type: ActionType.USER_LOGIN_SUCCESS,
          });
          
          // dispatch get user action
          dispatch({
            type: ActionType.GET_USER_SUCCESS,
            payload: res.data.payload
          })
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
        `${process.env.REACT_APP_API_URL}/user/login`,
        formData,
        config
      );

      //extract user data from the 
      // response
      const { cart, wishList, ...user } = data.payload 
      
      // add userInfo to 
      // redux store
      dispatch({
        type: ActionType.USER_LOGIN_SUCCESS
      });


      // add userInfo to
      // redux store
      dispatch({
        type: ActionType.GET_USER_SUCCESS,
        payload: user,
      })
      
      // add to local storage
      // as  " userInfo "
      localStorage.setItem("userInfo", JSON.stringify( user ));
      

    } catch (error: any) {

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
  itemsPrice: any,
  taxPrice: any,
  shippingPrice: any,
  totalPrice: any,
  paymentMethod: any ,
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.CREATE_ORDER_REQUEST,
      });

      const token = store.getState().user.userInfo.token;

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

      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/order`, formData, config);

 
      dispatch({
        type: ActionType.CREATE_ORDER_SUCCESS,
        payload: data.payload,
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

      const {token} = store.getState().user.userInfo;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };


      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/order/${id}`, config);

      dispatch({
        type: ActionType.GET_ORDER_SUCCESS,
        payload: data.payload,
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

      const token = store.getState().user.userInfo.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

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

      const token = store.getState().user.userInfo.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/v1/users`, config);

      dispatch({
        type: ActionType.GET_USER_SUCCESS,
        payload: data.payload,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.GET_USER_FAIL,
        payload: error,
      });
    }
  };
};

export const getUserReviews = () =>{
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.GET_USER_REVIEW_REQUEST,
      });

      const token = store.getState().user.userInfo.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/user/reviews`, config);

      dispatch({
        type: ActionType.GET_USER_REVIEW_SUCCESS,
        payload: data.payload,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.GET_USER_REVIEW_FAIL,
        payload: error,
      });
    }
  };
}

export const getOrders = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.GET_ORDERS_REQUEST,
      });

      const token = store.getState().user.userInfo.token;

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

      const token = store.getState().user.userInfo.token;

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

      const token = store.getState().user.userInfo.token;

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

      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/getTopProducts`);

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

      const token = store.getState().user.userInfo.token;

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
  fullName: string,
  email: string,
  password: string
) => {
  return async (dispatch: Dispatch<Action>, getState: any) => {
    try {
      dispatch({
        type: ActionType.UPDATE_PROFILE_REQUEST,
      });
      
      const id = store.getState().user.userInfo._id;
      const token = store.getState().user.userInfo.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = {
        fullName,
        email,
        password,
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/updateProfile`,
        formData,
        config
      );

      dispatch({
        type: ActionType.UPDATE_PROFILE_SUCCESS,
        payload: data.payload,
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

      const token = store.getState().user.userInfo.token;

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

    //remove info from localStorage

    localStorage.removeItem("userInfo");
    
    
    dispatch({ type: ActionType.USER_LOGOUT, payload: {} });
    dispatch({ type: ActionType.GET_USER_SUCCESS, payload: {} })
  };
};