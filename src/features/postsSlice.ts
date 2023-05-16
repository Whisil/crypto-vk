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
    addCommentToPost: (state, action) => {
      const { commentId, postId } = action.payload;
      state.posts = state.posts.map((item) => {
        if (item._id === postId && item.comments) {
          return { ...item, comments: [commentId, ...item.comments] };
        } else return item;
      });
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
});

export const { setPosts, setNewPost, deletePost, addCommentToPost } =
  postsSlice.actions;

export default postsSlice.reducer;
