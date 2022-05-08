import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

// redux-sagaで置き換え
// import thunk from 'redux-thunk';

// 自分でmiddlewareを作る場合
// import loggerMiddleware from './middleware/logger';

const persistConfig = {
  key: 'root',
  storage,
  // redux-thunkの導入でspinnerを表示できるようになったので、categoriesはローカルに持っておくメリットがなくなった。
  // blacklist: ['user', 'categories'],
  whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  process.env.NODE_ENV === 'development' && logger,
  sagaMiddleware,
  // redux-sagaで置き換え
  // thunk,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const componeEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, componeEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
