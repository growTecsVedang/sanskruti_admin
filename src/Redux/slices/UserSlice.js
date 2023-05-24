import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signUpUserWithEmail = createAsyncThunk(
  "signUpUserWithEmail",
  async (datas, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/emailregister", {
        method: "POST",
        body: JSON.stringify(datas),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 409 || response.status === 404) {
        const payload = await response.json();
        return rejectWithValue(payload);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const signUpUserWithNumber = createAsyncThunk(
  "signUpUserWithNumber",
  async (datas, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/numberregister", {
        method: "POST",
        body: JSON.stringify(datas),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 409 || response.status === 404) {
        const payload = await response.json();
        return rejectWithValue(payload);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    message: "",
    accessToken: "",
    type: "",
    loading: false,
  },
  reducers: {
    clearState: (state) => {
      state.type = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUserWithEmail.pending, (state, action) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(signUpUserWithEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(signUpUserWithEmail.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    builder.addCase(signUpUserWithNumber.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUpUserWithNumber.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(signUpUserWithNumber.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
  },
});

export const { addItem, clearState } = userSlice.actions;
export default userSlice.reducer;
