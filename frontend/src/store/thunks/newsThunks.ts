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