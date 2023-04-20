import { User } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: User;
  token: string;
  loading: boolean;
}

const initialState: UserState = {
  user: {
    _id: ``,
    username: ``,
    createdAt: ``,
    updatedAt: ``,
    ethAddress: ``,
    displayName: ``,
  },
  token: ``,
  loading: true,
};

const userSlice = createSlice({
  name: `user`,
  initialState,
  reducers: {
    setUserWallet: (state, action) => {
      state.user.ethAddress = action.payload;
    },
    changeUserLoading: (state) => {
      state.loading = !state.loading;
    },
    setUser: (state, action) => {
      state.user = { ...action.payload.user };
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = {
        _id: ``,
        username: ``,
        createdAt: ``,
        updatedAt: ``,
        ethAddress: ``,
        displayName: ``,
      };
    },
  },
});

export const { setUserWallet, changeUserLoading, setUser, clearUser } =
  userSlice.actions;

export default userSlice.reducer;
