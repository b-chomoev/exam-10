import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const createPost = createAsyncThunk<void, IPostMutation>(
  'news/createPost',
  async (postMutation) => {
    const formData = new FormData();

    const keys = Object.keys(postMutation) as (keyof IPostMutation)[];

    keys.forEach((key) => {
      const value = postMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/news', formData);
  }
);

export const fetchPosts = createAsyncThunk<IPost[], void>(
  'news/fetchPosts',
  async () => {
    const postsResponse = await axiosApi.get<IPost[]>('/news');
    return postsResponse.data || [];
  }
);

export const deletePost = createAsyncThunk<void, string>(
  'news/deletePost',
  async (id: string) => {
    await axiosApi.delete(`/news/${id}`);
  }
);

export const getPostById = createAsyncThunk<IPost | null, string>(
  'news/getPostById',
  async (id: string) => {
    const response = await axiosApi.get<IPost>(`/news/${id}`);

    if (!response.data) {
      return null;
    }

    return response.data;
  }
);