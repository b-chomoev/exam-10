import axiosApi from '../../axiosApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk<IComment[] | null, string>(
  'comments/fetchComments',
  async (newsId: string) => {
    const commentsResponse = await axiosApi<IComment[]>(`/comments?news_id=${newsId}`);
    return commentsResponse.data || [];
  }
);