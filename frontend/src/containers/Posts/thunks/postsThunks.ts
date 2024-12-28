import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';

export const fetchAllPosts = createAsyncThunk<IPost[], void>(
  'posts/fetchAllPosts',
  async () => {
    const messages = await axiosApi.get<IPost[]>('/posts');
    return messages.data;
  }
);

export const fetchOnePost = createAsyncThunk<IPost | null, string>(
  'posts/fetchOnePost',
  async (id) => {
    const messages = await axiosApi.get<IPost | null>(`/posts/${id}`);

    return messages.data || null;
  }
);

export const addNewPost = createAsyncThunk<void, IPostMutation>(
  'posts/addNewPost',
  async (newPost) => {
    const formData = new FormData();

    const keys = Object.keys(newPost) as (keyof IPostMutation)[];

    keys.forEach((key) => {
      const value = newPost[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/posts', formData);
  }
);

export const deletePost = createAsyncThunk<void, string>(
  'posts/deletePost',
  async (id: string) => {
    await axiosApi.delete(`/posts/${id}`);
  }
);

