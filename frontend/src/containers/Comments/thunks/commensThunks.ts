import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';

export const addNewComment = createAsyncThunk<void, ICommentMutation>(
  'comments/addNewComment',
  async (newComment) => {
    await axiosApi.post('/comments', newComment);
  }
);