import CartActionTypes  from './cart.types'
import { addItemToCart, clearItemFromCart, increaseItemQuantity, decreaseItemQuantity } from './cart.utils'

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)  
      };
    case CartActionTypes.CLEAR_ITEM:
      return {
        ...state,
        cartItems: clearItemFromCart(state.cartItems, action.payload)  
      };
    case CartActionTypes.INCREASE_ITEM:
      return {
        ...state,
        cartItems: increaseItemQuantity(state.cartItems, action.payload)  
      };
    case CartActionTypes.DECREASE_ITEM:
      return {
        ...state,
        cartItems: decreaseItemQuantity(state.cartItems, action.payload)  
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: []  
      };
    default:
      return state;
  }
};

export default cartReducer;