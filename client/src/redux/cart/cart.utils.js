export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem => 
      existingCartItem.id === cartItem.id 
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};


export const clearItemFromCart = (cartItems, cartItemToRemove) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
};

export const increaseItemQuantity = (cartItems, item) => {
  return cartItems.map(cartItem =>  
    item.id === cartItem.id 
      ? {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
  );
};

export const decreaseItemQuantity = (cartItems, item) => {

  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === item.id
  );

  if (existingCartItem.quantity === 1){
    return clearItemFromCart(cartItems, item);
  }

  return cartItems.map(cartItem =>  
    item.id === cartItem.id 
      ? {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem
  );

};
