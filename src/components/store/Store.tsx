import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../reducers/SearchSlice';
import { ApiService } from '../services/ApiService';

const store = configureStore({
  reducer: {
    search: searchReducer,
    [ApiService.reducerPath]: ApiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiService.middleware),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
