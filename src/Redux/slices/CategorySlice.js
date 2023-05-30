import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addCategory = createAsyncThunk(
  "addCategory",
  async (datas, { rejectWithValue }) => {
    try {
      const url = "/api/v1/admin/addCategory";
      const token = datas.accessToken;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // You may need to include other headers based on the API requirements
      };
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(datas),
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

export const addCategoryImage = createAsyncThunk(
  "addCategoryImage",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `/api/v1/admin/addCategoryImage?_id=${datas._id}`;
      const token = datas.accessToken;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // You may need to include other headers based on the API requirements
      };
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: datas.formData,
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

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
    message: "",
    _id: null,
    type: "",
  },
  reducers: {
    clearState: (state) => {
      state.type = "";
    },
  },
  extraReducers: (builder) => {
    // signUpUserWithEmail

    builder.addCase(addCategory.pending, (state, action) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state._id = action.payload._id;
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
  },
});

export const { addItem, clearState } = categorySlice.actions;
export default categorySlice.reducer;
