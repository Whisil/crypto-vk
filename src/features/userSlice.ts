import { IUser } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: IUser;
  token: string;
}

const initialState: UserState = {
  user: {
    _id: ``,
    username: ``,
    createdAt: ``,
    updatedAt: ``,
    ethAddress: ``,
    displayName: ``,
    bannerURL: null,
    avatarURL: null,
    bio: null,
    websiteURL: null,
    posts: [],
    savedPosts: [],
    likes: [],
    comments: [],
    followersCount: 0,
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
    addSavedPost: (state, action) => {
      state.user.savedPosts = [...state.user.savedPosts, action.payload];
    },
    removeSavedPost: (state, action) => {
      state.user.savedPosts = state.user.savedPosts.filter(
        (postId) => postId !== action.payload,
      );
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
  addSavedPost,
  removeSavedPost,
  deleteUserPost,
} = userSlice.actions;

export default userSlice.reducer;
