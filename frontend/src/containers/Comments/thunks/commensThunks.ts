import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';

export const getPostComment = createAsyncThunk<IComment[], string>(
  'comments/getPostComment',
  async (post_id) => {
    const response = await axiosApi.get<IComment[]>('/comments?news_id=' + post_id);
    return response.data || [];
  }
);

export const deleteComment = createAsyncThunk<void, string>(
  'comments/deleteComment',
  async (comment_id: string) => {
    await axiosApi.delete(`/comments/${comment_id}`);
  }
);
export const addNewComment = createAsyncThunk<void, ICommentMutation>(
  'comments/addNewComment',
  async (newComment) => {
    await axiosApi.post('/comments', newComment);
  }
);