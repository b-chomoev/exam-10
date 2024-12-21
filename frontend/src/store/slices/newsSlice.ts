import { createSlice } from '@reduxjs/toolkit';
import { createPost, fetchPosts } from '../thunks/newsThunks';
import { RootState } from '../../app/store';

interface INewsState {
  news: IPost[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: INewsState = {
  news: [],
  fetchLoading: false,
  createLoading: false,
};

export const selectNews = (state: RootState) => state.news.news;
export const selectCreateLoading = (state: RootState) => state.news.createLoading;
export const selectFetchLoading = (state: RootState) => state.news.fetchLoading;

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createPost.rejected, (state) => {
        state.createLoading = false;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, {payload: news}) => {
        state.fetchLoading = false;
        state.news = news;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.fetchLoading = false;
      })
  }
});

export const newsReducer = newsSlice.reducer;