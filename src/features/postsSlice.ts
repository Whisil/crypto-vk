import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '@/types/post';

interface PostsState {
  posts: IPost[];
}

const initialState: PostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: `posts`,
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setNewPost: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
});

export const { setPosts, setNewPost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
