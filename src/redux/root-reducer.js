import { combineReducers } from 'redux';

import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'

import { persistReducer } from 'redux-persist';

//indicates to REDUX that we want to use localStorage
import storage from "redux-persist/lib/storage";  

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: stringnames of reducers we want to store
  // only cart for now since user persist is handle by firebase
  whitelist: ['cart'] 
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

// persistReducer: returns modified version of root reducer with the persistent capabilities
export default persistReducer(persistConfig, rootReducer);