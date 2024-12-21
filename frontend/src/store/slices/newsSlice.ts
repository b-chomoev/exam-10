import { createSlice } from '@reduxjs/toolkit';
import { createPost, deletePost, fetchPosts } from '../thunks/newsThunks';
import { RootState } from '../../app/store';

interface INewsState {
  news: IPost[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}

const initialState: INewsState = {
  news: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
};

export const selectNews = (state: RootState) => state.news.news;
export const selectCreateLoading = (state: RootState) => state.news.createLoading;
export const selectFetchLoading = (state: RootState) => state.news.fetchLoading;
export const selectDeleteLoading = (state: RootState) => state.news.deleteLoading;

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
      .addCase(deletePost.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deletePost.rejected, (state) => {
        state.deleteLoading = false;
      })
  }
});

export const newsReducer = newsSlice.reducer;