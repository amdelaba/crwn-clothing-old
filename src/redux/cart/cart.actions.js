import CartActionTypes from './cart.types';

// payload is optional, since its not needed here
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const clearItem = item => ({
  type: CartActionTypes.CLEAR_ITEM,
  payload: item
});

export const increaseItem = item => ({
  type: CartActionTypes.INCREASE_ITEM,
  payload: item
});

export const decreaseItem = item => ({
  type: CartActionTypes.DECREASE_ITEM,
  payload: item
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART
});

 
