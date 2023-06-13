import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `/api/v1/admin/deleteuser?id=${datas.id}`;
      const headers = {
        "Content-Type": "application/json; charset=utf-8",
      };
      const response = await fetch(url, {
        method: "DELETE",
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

export const updateUser = createAsyncThunk(
  "updateUser",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `/api/v1/superadmin/banAndEditUser?id=${datas.id}`;
      const headers = {
        "Content-Type": "application/json; charset=utf-8",
      };
      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(datas.body),
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
    try {
      const response = await fetch("/api/v1/user/login", {
        method: "POST",
        body: JSON.stringify(datas),
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
  async ({ rejectWithValue }) => {
    try {
      const url = "/api/v1/user/logout";
      const headers = {
        "Content-Type": "application/json; charset=utf-8",
      };
      const response = await fetch(url, {
        method: "GET",
        headers,
        credentials: "include",
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

export const loadAllUsers = createAsyncThunk(
  "loadAllUsers",
  async ({ rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/admin/getAllUsers", {
        method: "GET",
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

export const getUserDetails = createAsyncThunk(
  "getUserDetails",
  async (datas, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/v1/admin/getUserDetails?id=${datas.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

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

export const userProfile = createAsyncThunk(
  "userProfile",
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
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: {},
    message: "",
    role: "",
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
    // deleteUser
    builder.addCase(deleteUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // updateUser
    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
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
      state.isAuthenticated = action.payload.isAuthenticated;
      state.role = action.payload.role;
    });
    builder.addCase(logInUserWithEmailOrNumber.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
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
      state.isAuthenticated = false;
    });
    builder.addCase(logOutUser.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.isAuthenticated = action.payload.isAuthenticated;
    });

    // loadAllUsers
    builder.addCase(loadAllUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loadAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.type = action.payload.type;
      state.users = action.payload.users;
    });
    builder.addCase(loadAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // userProfile
    builder.addCase(userProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.type = action.payload.type;
      state.user = action.payload.userTrimmend;
    });
    builder.addCase(userProfile.rejected, (state, action) => {
      state.loading = false;
      state.type = action.payload.type;
    });

    // getUserDetails
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.type = action.payload.type;
      state.user = action.payload.user;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.type = action.payload.type;
    });
  },
});

export const { addItem, clearState } = userSlice.actions;
export default userSlice.reducer;
