import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productSlice from './products/productSlice';
import storage from 'redux-persist/lib/storage';
import userSlice  from './user/userSlice';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from 'redux-persist'

const commonConfig = {
  key: 'shop/user',
  storage
}
const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token', 'current', 'currentCart']
}
export const store = configureStore({
  reducer: {
      app: appSlice,
      products: productSlice,
      user: persistReducer(userConfig, userSlice)
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck:{
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  })
});

export const persistor = persistStore(store)
