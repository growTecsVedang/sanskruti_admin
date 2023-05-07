import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signUpUserWithEmail = createAsyncThunk(
  "signUpUserWithEmail",
  async (data, { rejectWithValue }) => {
    const { username, email, password } = data;
    const config = { headers: { "Content-Type": "application/json" } };
    const response = await axios.post(
      "/api/v1/user/emailregister",
      {
        username,
        email,
        password,
      },
      config
    );
    try {
      const result = response.data;
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error.error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    message: "",
    type: "",
    loading: true,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [signUpUserWithEmail.pending]: (state, action) => {
      state.loading = true;
    },
    [signUpUserWithEmail.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    [signUpUserWithEmail.rejected]: (state, action) => {
      state.loading = false;
      console.log(action);
    },
  },
});

export const { addItem } = userSlice.actions;
export default userSlice.reducer;
