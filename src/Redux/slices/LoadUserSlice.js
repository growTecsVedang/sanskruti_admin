import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const loadUser = createAsyncThunk(
  "loadUser",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.ENDPOINT}/api/v1/user`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 409 || response.status === 404) {
        const payload = response.data;
        return rejectWithValue(payload);
      }

      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const loadUserSlice = createSlice({
  name: "loadUser",
  initialState: {
    loaduser: {},
    loading: false,
    isAuthenticate: false,
  },
  reducers: {
    clearIsAuthenticate: (state) => {
      state.isAuthenticate = false;
      state.loaduser = {};
    },
  },
  extraReducers: (builder) => {
    // loadUser
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.type = action.payload.type;
      state.loaduser = action.payload.userTrimmend;
      state.isAuthenticate = action.payload.isAuthenticated;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.type = action.payload.type;
      state.isAuthenticate = action.payload.isAuthenticated;
    });
  },
});

export const { addItem, clearIsAuthenticate } = loadUserSlice.actions;
export default loadUserSlice.reducer;
