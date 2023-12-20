import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import {
  createOrderReducer,
  getOrderReducer,
  orderPayReducer,
  getOrdersReducer,
  orderDeliverReducer,
  getMyOrdersReducer,
} from "./orderReducers";
import {
  addReviewReducer,
  createProductReducer,
  getProductReducer,
  getProductsReducer,
} from "./productReducer";
import {
  loginReducer,
  registerReducer,
  getUserReducer,
  updateProfileReducer,
  updateUserReducer,
  getUserReview,
} from "./userReducer";
import wishListReducer from "./wishListReducer";

const reducers = combineReducers({
  cart: cartReducer,
  wishList: wishListReducer,
  products: getProductsReducer,
  product: getProductReducer,
  review: addReviewReducer,
  userRegister: registerReducer,
  userLogin: loginReducer,
  order: getOrderReducer,
  orderCreate: createOrderReducer,
  orderPay: orderPayReducer,
  user: getUserReducer,
  orders: getOrdersReducer,
  orderDeliver: orderDeliverReducer,
  createProduct: createProductReducer,
  myOrders: getMyOrdersReducer,
  profileUpdate: updateProfileReducer,
  userUpdate: updateUserReducer,
  userReivew: getUserReview,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
