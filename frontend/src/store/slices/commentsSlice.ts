import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchComments } from '../thunks/commentsThunks';

interface ICommentsState {
  comments: IComment[];
  oneComment: IComment | null;
  fetchLoading: boolean;
}

const initialState: ICommentsState = {
  comments: [],
  oneComment: null,
  fetchLoading: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<IComment[] | null>) => {
        state.fetchLoading = false;
        state.comments = action.payload || []
      })
      .addCase(fetchComments.rejected, (state) => {
        state.fetchLoading = false;
      })
  },
});

export const commentsReducer = commentsSlice.reducer;