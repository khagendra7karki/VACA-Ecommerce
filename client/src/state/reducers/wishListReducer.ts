import { ActionType } from "../action-types";
import { Action } from "../actions/index";


const wishListReducer = (
  state = {
    wishListItems: [] as Array<any>,
    error: null,
    loading: false
  },
  action: Action
) => {
  switch (action.type) {
    
    case ActionType.WISHLIST_SET:
      const wishListItem = action.payload;
      return { 
        ...state,
        wishListItems: wishListItem
      }

    case ActionType.WISHLIST_ADD_ITEM:
      const item = action.payload;

      return {
        ...state,
        wishListItems: [...state.wishListItems, item],
      };

    case ActionType.WISHLIST_REMOVE_ITEM:
      return {
        ...state,
        wishListItems: state.wishListItems.filter(
          (x: any) => x.product !== action.payload
        ),
      };

      default:
      return state;
  }
};

export default wishListReducer;