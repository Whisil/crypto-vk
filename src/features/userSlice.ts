import { User } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: User;
  loading: boolean;
}

const initialState: UserState = {
  user: {
    username: ``,
    createdAt: ``,
    ethAddress: ``,
    displayName: ``,
  },
  loading: true,
};

const userSlice = createSlice({
  name: `user`,
  initialState,
  reducers: {},
});

export default userSlice.reducer;
