import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addCategory = createAsyncThunk(
  "addCategory",
  async (datas, { rejectWithValue }) => {
    try {
      const url = "/api/v1/admin/addCategory";
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(datas),
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

export const addCategoryImage = createAsyncThunk(
  "addCategoryImage",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `/api/v1/admin/addCategoryImage?_id=${datas._id}`;
      const headers = {
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
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `/api/v1/admin/deleteCategory?id=${datas.id}`;
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

export const updateCategory = createAsyncThunk(
  "updateCategory",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `/api/v1/admin/updateCategory?id=${datas.id}`;
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

export const searchCategory = createAsyncThunk(
  "searchCategory",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `/api/v1/user/categories?keyword=${datas.value}`;
      const headers = {
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

    // deleteCategory
    builder.addCase(deleteCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // updateCategory
    builder.addCase(updateCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // searchCategory
    builder.addCase(searchCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(searchCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.categories = action.payload.categories;
    });
    builder.addCase(searchCategory.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
  },
});

export const { addItem, clearState } = categorySlice.actions;
export default categorySlice.reducer;
