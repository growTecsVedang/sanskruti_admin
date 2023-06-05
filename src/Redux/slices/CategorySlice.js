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
        // You may need to include other headers based on the API requirements
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

export const loadAllCategories = createAsyncThunk(
  "loadAllCategories",
  async ({ rejectWithValue }) => {
    console.log("called");
    try {
      const response = await fetch("/api/v1/user/categories", {
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
    // addCategory

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

    // addCategoryImage

    builder.addCase(addCategoryImage.pending, (state, action) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(addCategoryImage.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(addCategoryImage.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // loadAllCategories
    builder.addCase(loadAllCategories.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loadAllCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.categories = action.payload.categories;
    });
    builder.addCase(loadAllCategories.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
  },
});

export const { addItem, clearState } = categorySlice.actions;
export default categorySlice.reducer;
