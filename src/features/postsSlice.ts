import { createSlice } from '@reduxjs/toolkit';
import { Post } from '@/types/post';

interface PostsState {
  posts: Post[];
  loading: boolean;
}

const initialState: PostsState = {
  posts: [{ createdAt: ``, text: ``, createdBy: ``, likes: [] }],
  loading: true,
};

export const postsSlice = createSlice({
  name: `posts`,
  initialState,
  reducers: {},
});

export default postsSlice.reducer;
