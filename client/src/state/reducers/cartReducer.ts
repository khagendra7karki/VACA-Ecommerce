import { ActionType } from "../action-types";
import { Action } from "../actions/index";


const cartReducer = (
  state = {
    cartItems: [] as Array<any>,
    loading: {},
    error: {},
  },
  action: Action
) => {
  switch (action.type) {
    case ActionType.CART_SET:
      const cartItems = action.payload;
      return { 
        ...state,
        cartItems: cartItems
      }
    case ActionType.CART_ADD_ITEM:
      const item = action.payload;

      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    case ActionType.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x: any) => x.product !== action.payload
        ),
      };
      
    case ActionType.CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
