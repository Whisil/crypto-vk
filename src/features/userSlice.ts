import { IPost } from '@/types/post';
import { IUser } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: IUser;
  token: string;
}

const initialState: UserState = {
  user: {
    username: ``,
    createdAt: ``,
    updatedAt: ``,
    ethAddress: ``,
    displayName: ``,
    posts: [],
  },
  token: ``,
};

const userSlice = createSlice({
  name: `user`,
  initialState,
  reducers: {
    setUserWallet: (state, action) => {
      state.user = { ...state.user, ethAddress: action.payload };
    },
    setUser: (state, action) => {
      state.user = { ...action.payload.user };
      state.token = action.payload.token;
    },
    addUserPost: (state, action) => {
      state.user.posts = [...state.user.posts, action.payload];
    },
    deleteUserPost: (state, action) => {
      state.user.posts = state.user.posts.filter(
        (postId) => postId !== action.payload,
      );
    },
    clearUser: () => initialState,
  },
});

export const {
  setUserWallet,
  setUser,
  addUserPost,
  clearUser,
  deleteUserPost,
} = userSlice.actions;

export default userSlice.reducer;
