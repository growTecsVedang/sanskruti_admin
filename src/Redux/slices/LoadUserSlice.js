import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadUser = createAsyncThunk(
  "loadUser",
  async ({ rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 409 || response.status === 404) {
        const payload = await response.json();
        return rejectWithValue(payload);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
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
