import { IPost } from '@/types/post';
import { createSlice } from '@reduxjs/toolkit';
import postsSlice from './postsSlice';

interface CommentsState {
  comments: IPost[];
}

const initialState: CommentsState = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: `comments`,
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setNewComment: (state, action) => {
      state.comments = [...state.comments, ...action.payload];
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload,
      );
    },
    clearComments: () => initialState,
  },
});

export const { setComments, setNewComment, deleteComment, clearComments } =
  commentsSlice.actions;

export default commentsSlice.reducer;
