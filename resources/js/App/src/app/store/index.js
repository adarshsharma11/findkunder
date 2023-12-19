import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import createReducer from './rootReducer';

if (process.env.NODE_ENV === 'development') {
  if (import.meta.hot) {
    import.meta.hot.accept('./rootReducer', () => {
      const newRootReducer = require('./rootReducer').default;
      store.replaceReducer(newRootReducer.createReducer());
    });
  }  
}

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({ collapsed: (getState, action, logEntry) => !logEntry.error });

  middlewares.push(logger);
}

const store = configureStore({
  reducer: createReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV === 'development',
});

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    return false;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

export default store;
