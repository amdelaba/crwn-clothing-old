import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

//array of functions
const middlewares = [
  logger
];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

//persisted verison of store
export const persistor = persistStore(store);
  
export default { store, persistor };