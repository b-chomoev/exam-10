import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { addNewComment } from '../thunks/commensThunks';

export interface ICommentState {
  comments: IComment[];
  fetchLoading: boolean;
  addLoading: boolean;
}

const initialState: ICommentState = {
  comments: [],
  fetchLoading: false,
  addLoading: false,
};

export const selectAllComments = (state: RootState) => state.comments.comments;
export const selectFetchLoading = (state: RootState) => state.comments.fetchLoading;
export const selectAddLoading = (state: RootState) => state.comments.addLoading;

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewComment.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addNewComment.fulfilled, (state) => {
        state.addLoading = false;
      })
      .addCase(addNewComment.rejected, (state) => {
        state.addLoading = true;
      })
  }
});

export const commentsReducer = commentsSlice.reducer;