import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import { fearlessApi } from '../api/fearless';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    [fearlessApi.reducerPath]: fearlessApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fearlessApi.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
