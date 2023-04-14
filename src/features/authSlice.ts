import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  displayName: string;
}

const initialState: AuthState = {
  isAuthenticating: false,
  isAuthenticated: false,
  displayName: ``,
};

export const authSlice = createSlice({
  name: `auth`,
  initialState,
  reducers: {
    changeIsAuthenticating: (state) => {
      state.isAuthenticating = !state.isAuthenticating;
    },
  },
});

export const { changeIsAuthenticating } = authSlice.actions;

export default authSlice.reducer;
