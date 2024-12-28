import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from '../containers/Posts/slices/postsSlice';
import { commentsReducer } from '../containers/Comments/slices/commentsSlice';

export const store = configureStore({
  reducer: {
    posts: newsReducer,
    comments: commentsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
