import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/postsSlice';
import userReducer from '../features/userSlice';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
