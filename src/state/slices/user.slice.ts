import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    info: { username: "test" } as any,
  },
  reducers: {
    setUser: (state, action) => {
      state.info = { ...action.payload, connected: false };
    },
  },
});

const { setUser } = userSlice.actions;

const getUserInfo = (state: any) => state.userReducer.info;

export { userSlice, setUser, getUserInfo };
