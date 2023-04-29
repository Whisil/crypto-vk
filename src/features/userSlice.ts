import { IUser } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: IUser;
  token: string;
  loading: boolean;
}

const initialState: UserState = {
  user: {
    username: ``,
    createdAt: ``,
    updatedAt: ``,
    ethAddress: ``,
    displayName: ``,
  },
  token: ``,
  loading: false,
};

const userSlice = createSlice({
  name: `user`,
  initialState,
  reducers: {
    setUserWallet: (state, action) => {
      state.user.ethAddress = action.payload;
    },
    setUser: (state, action) => {
      state.user = { ...action.payload.user };
      state.token = action.payload.token;
    },
    clearUser: () => initialState,
  },
});

export const { setUserWallet, setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
