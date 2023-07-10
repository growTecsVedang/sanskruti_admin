import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.ENDPOINT}/api/v1/admin/deleteuser?id=${datas.id}`;
      const headers = {
        "Content-Type": "application/json; charset=utf-8",
      };

      const response = await axios.delete(url, {
        headers,
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

export const updateUser = createAsyncThunk(
  "updateUser",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.ENDPOINT}/api/v1/superadmin/banAndEditUser?id=${datas.id}`;
      const headers = {
        "Content-Type": "application/json; charset=utf-8",
      };

      const response = await axios.put(url, datas.body, {
        headers,
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

export const logInUserWithEmailOrNumber = createAsyncThunk(
  "logInUserWithEmailOrNumber",
  async (datas, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.ENDPOINT}/api/v1/user/login`,
        datas,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

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

export const logOutUser = createAsyncThunk(
  "logOutUserWithNumber",
  async ({ rejectWithValue }) => {
    try {
      const url = `${process.env.ENDPOINT}/api/v1/user/logout`;
      const headers = {
        "Content-Type": "application/json; charset=utf-8",
      };

      const response = await axios.get(url, {
        headers,
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

export const loadAllUsers = createAsyncThunk(
  "loadAllUsers",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.ENDPOINT}/api/v1/admin/getAllUsers`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

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

export const getUserDetails = createAsyncThunk(
  "getUserDetails",
  async (datas, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.ENDPOINT}/api/v1/admin/getUserDetails?id=${datas.id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

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

export const userProfile = createAsyncThunk(
  "userProfile",
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    userCount: 0,
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
      state.userCount = action.payload.userCount;
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
