import { 
  createStore, 
  combineReducers, 
  applyMiddleware 
} from 'redux';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
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
  storage,
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