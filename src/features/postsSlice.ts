import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '@/types/post';

interface PostsState {
  posts: IPost[];
  loading: boolean;
}

const initialState: PostsState = {
  posts: [{ id: ``, createdAt: ``, text: ``, createdBy: ``, likesCount: 0 }],
  loading: true,
};

export const postsSlice = createSlice({
  name: `posts`,
  initialState,
  reducers: {},
});

export default postsSlice.reducer;
