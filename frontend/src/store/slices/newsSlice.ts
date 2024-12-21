import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPost, deletePost, fetchPosts, getPostById } from '../thunks/newsThunks';
import { RootState } from '../../app/store';

interface INewsState {
  news: IPost[];
  onePost: IPost | null;
  fetchLoading: boolean;
  oneFetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}

const initialState: INewsState = {
  news: [],
  onePost: null,
  fetchLoading: false,
  oneFetchLoading: false,
  createLoading: false,
  deleteLoading: false,
};

export const selectNews = (state: RootState) => state.news.news;
export const selectOnePost = (state: RootState) => state.news.onePost;
export const selectCreateLoading = (state: RootState) => state.news.createLoading;
export const selectFetchLoading = (state: RootState) => state.news.fetchLoading;
export const selectDeleteLoading = (state: RootState) => state.news.deleteLoading;
export const selectOneFetchLoading = (state: RootState) => state.news.oneFetchLoading;

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
      .addCase(getPostById.pending, (state) => {
        state.oneFetchLoading = true;
      })
      .addCase(getPostById.fulfilled, (state, action: PayloadAction<IPost | null>) => {
        state.oneFetchLoading = false;
        state.onePost = action.payload;
      })
      .addCase(getPostById.rejected, (state) => {
        state.oneFetchLoading = false;
      })
  }
});

export const newsReducer = newsSlice.reducer;