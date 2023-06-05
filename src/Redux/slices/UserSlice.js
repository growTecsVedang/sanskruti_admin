import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signUpUser = createAsyncThunk(
  "signUpUser",
  async (datas, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/register", {
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

export const logInUserWithEmailOrNumber = createAsyncThunk(
  "logInUserWithEmailOrNumber",
  async (datas, { rejectWithValue }) => {
    console.log(datas);
    try {
      const response = await fetch("/api/v1/user/login", {
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

export const logOutUser = createAsyncThunk(
  "logOutUserWithNumber",
  async (datas, { rejectWithValue }) => {
    console.log(datas);
    try {
      const url = "/api/v1/user/logout";
      const token = datas.accessToken;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8",
      };
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (response.status === 409 || response.status === 404) {
        const payload = await response.json();
        return rejectWithValue(payload);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const loadUser = createAsyncThunk(
  "loadUser",
  async ({ rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/me", {
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    message: "",
    accessToken: "",
    type: "",
    loading: false,
    isAuthenticated: false,
  },
  reducers: {
    clearState: (state) => {
      state.type = "";
    },
  },
  extraReducers: (builder) => {
    // signUpUserWithEmail

    builder.addCase(signUpUser.pending, (state, action) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // logInUserWithEmailOrNumber
    builder.addCase(logInUserWithEmailOrNumber.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logInUserWithEmailOrNumber.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = action.payload.isAuthenticated;
    });
    builder.addCase(logInUserWithEmailOrNumber.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = action.payload.isAuthlogInUserWithEmail;
    });
    // logOutUserWithNumber
    builder.addCase(logOutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.accessToken = "";
      state.isAuthenticated = false;
    });
    builder.addCase(logOutUser.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = action.payload.isAuthenticated;
    });

    // loadUser
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.type = action.payload.type;
      state.accessToken = action.payload.user.accessToken;
      state.isAuthenticated = action.payload.isAuthenticated;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.type = action.payload.type;
      state.accessToken = action.payload.user.accessToken;
      state.isAuthenticated = action.payload.isAuthenticated;
    });
  },
});

export const { addItem, clearState } = userSlice.actions;
export default userSlice.reducer;
