import { createSlice } from '@reduxjs/toolkit';
import { addNewPost, deletePost, fetchAllPosts, fetchOnePost } from '../thunks/postsThunks';
import { RootState } from '../../../app/store';

interface IPostsState {
  posts: IPost[];
  onePost: IPost | null;
  fetchLoading: boolean;
  deleteLoading: boolean;
  addLoading: boolean;
}

const initialState: IPostsState = {
  posts: [],
  onePost: null,
  fetchLoading: false,
  deleteLoading: false,
  addLoading: false,
};

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const selectOnePost = (state: RootState) => state.posts.onePost;
export const selectFetchLoading = (state: RootState) => state.posts.fetchLoading;
export const selectDeleteLoading = (state: RootState) => state.posts.deleteLoading;
export const selectAddLoading = (state: RootState) => state.posts.addLoading;

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAllPosts.fulfilled, (state, {payload: posts}) => {
        state.fetchLoading = false;
        state.posts = posts;
      })
      .addCase(fetchAllPosts.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(fetchOnePost.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchOnePost.fulfilled, (state, {payload: post}) => {
        state.fetchLoading = false;
        state.onePost = post;
      })
      .addCase(fetchOnePost.rejected, (state) => {
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

      .addCase(addNewPost.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addNewPost.fulfilled, (state) => {
        state.addLoading = false;
      })
      .addCase(addNewPost.rejected, (state) => {
        state.addLoading = false;
      })

  }
});

export const newsReducer = postsSlice.reducer;