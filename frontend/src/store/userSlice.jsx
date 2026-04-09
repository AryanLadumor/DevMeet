import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,

    isLoading: true,
  },
  reducers: {
    addUser(state, action) {
      state.userInfo = action.payload;
      state.isLoading = false;
    },
    removeUser(state) {
      state.userInfo = null;
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser, getConnections } = userSlice.actions;
