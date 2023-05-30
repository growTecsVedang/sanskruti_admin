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

export const logInUserWithNumber = createAsyncThunk(
  "logInUserWithNumber",
  async (datas, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/numberlogin", {
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

export const logInUserWithEmail = createAsyncThunk(
  "logInUserWithEmail",
  async (datas, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/emaillogin", {
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

export const logOutUserWithNumber = createAsyncThunk(
  "logOutUserWithNumber",
  async (datas, { rejectWithValue }) => {
    try {
      const url = "/api/v1/user/numberlogout";
      const token = datas.accessToken;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // You may need to include other headers based on the API requirements
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

    // signUpUserWithNumber

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

    // logInUserWithNumber
    builder.addCase(logInUserWithNumber.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logInUserWithNumber.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = action.payload.isAuthenticated;
    });
    builder.addCase(logInUserWithNumber.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = action.payload.isAuthenticated;
    });

    // logInUserWithEmail
    builder.addCase(logInUserWithEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logInUserWithEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = action.payload.isAuthenticated;
    });
    builder.addCase(logInUserWithEmail.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = action.payload.isAuthlogInUserWithEmail;
    });
    // logOutUserWithNumber
    builder.addCase(logOutUserWithNumber.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logOutUserWithNumber.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = action.payload.isAuthenticated;
    });
    builder.addCase(logOutUserWithNumber.rejected, (state, action) => {
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
