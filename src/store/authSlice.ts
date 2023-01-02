import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./localStorage";

interface StoreUser {
  _id: string;
  username: string;
}

interface AuthSliceState {
  token: string | null;
  user: StoreUser | null;
}

const persistedState = loadState();


const initialState = persistedState
  ? ({
      token: persistedState.auth.token,
      user: persistedState.auth.user,
    } as AuthSliceState)
  : ({ token: null, user: null } as AuthSliceState);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<StoreUser>) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setToken, setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
