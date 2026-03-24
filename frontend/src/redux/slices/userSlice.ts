import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types";

interface UserState {
  userInfo: User | null;
  token: string | null;
}

const initialState: UserState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo") || "null"),
  token: localStorage.getItem("token"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.userInfo = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    logout: (state) => {
      state.userInfo = null;
      state.token = null;

      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;