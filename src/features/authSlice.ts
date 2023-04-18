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
    setIsAuthenticated: (state) => {
      state.isAuthenticated = true;
      state.isAuthenticating = false;
    },
    changeIsAuthenticating: (state) => {
      state.isAuthenticating = true;
    },
  },
});

export const { changeIsAuthenticating, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
