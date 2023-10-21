import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const loadUser = createAsyncThunk(
  "loadUser",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/user`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.status);
      if (response.status === 409 || response.status === 404) {
        const payload = response.data;
        console.log(payload);
        return rejectWithValue(payload);
      }

      const data = response.data;
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const loadUserSlice = createSlice({
  name: "loadUser",
  initialState: {
    type: "",
    loaduser: {},
    loading: false,
    isAuthenticate: false,
    isLoggedOut: false,
  },
  reducers: {
    clearIsAuthenticate: (state) => {
      state.isAuthenticate = false;
      state.loaduser = {};
      state.isLoggedOut = true;
    },
  },
  extraReducers: (builder) => {
    // loadUser
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
      state.isAuthenticate = true;
      state.isLoggedOut = false;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.type = action.payload.type;
      state.loaduser = action.payload.userTrimmend;
      state.isAuthenticate = action.payload.isAuthenticated;
      state.isLoggedOut = false;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      if (action.payload) {
        state.loading = false;
        state.isLoggedOut = false;
        state.type = action.payload.type;
        state.isAuthenticate = action.payload.isAuthenticated;
      } else {
        state.loading = false;
        state.isLoggedOut = true;
      }
    });
  },
});

export const { addItem, clearIsAuthenticate } = loadUserSlice.actions;
export default loadUserSlice.reducer;
