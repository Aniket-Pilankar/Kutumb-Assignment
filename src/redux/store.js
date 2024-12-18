import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import quotesSlice from './slices/quotesSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    quotes: quotesSlice,
  },
});

export default store;
