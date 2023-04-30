import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '@/types/post';

interface PostsState {
  posts: IPost[];
  loading: boolean;
}

const initialState: PostsState = {
  posts: [],
  loading: true,
};

export const postsSlice = createSlice({
  name: `posts`,
  initialState,
  reducers: {
    setNewPost: (state, action) => {
      state.posts.push(action.payload);
    },
  },
});

export const { setNewPost } = postsSlice.actions;

export default postsSlice.reducer;
