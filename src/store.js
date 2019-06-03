import { 
  createStore, 
  combineReducers, 
  applyMiddleware 
} from 'redux';
import { 
  CookieStorage 
} from 'redux-persist-cookie-storage';
import Cookies from 'cookies-js';
import thunk from 'redux-thunk';
import { 
  persistStore, 
  persistReducer 
} from 'redux-persist';
import cartReducer from './reducers/cartReducer';


const appReducer = combineReducers({
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage: new CookieStorage(Cookies),
  blacklist: []
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

let persistor = persistStore(store);

export default { 
  store, 
  persistor 
};