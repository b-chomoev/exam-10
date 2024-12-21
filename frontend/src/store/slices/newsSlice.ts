import { createSlice } from '@reduxjs/toolkit';
import { createPost } from '../thunks/newsThunks';
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
  }
});

export const newsReducer = newsSlice.reducer;