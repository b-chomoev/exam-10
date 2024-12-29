// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axiosApi from '../../../axiosApi';
//
// export const addNewComment = createAsyncThunk<void, IPostMutation>(
//   'posts/addNewPost',
//   async (newComment) => {
//     const formData = new FormData();
//
//     const keys = Object.keys(newPost) as (keyof IPostMutation)[];
//
//     keys.forEach((key) => {
//       const value = newPost[key];
//
//       if (value !== null) {
//         formData.append(key, value);
//       }
//     });
//
//     await axiosApi.post('/posts', formData);
//   }
// );