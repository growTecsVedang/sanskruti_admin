import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addSubCategory = createAsyncThunk(
  "addSubCategory",
  async (datas, { rejectWithValue }) => {
    try {
      const url = "/api/v1/admin/addSubCategory";
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

export const updateSubCategory = createAsyncThunk(
  "updateSubCategory",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `/api/v1/admin/updateSubCategory?id=${datas.id}`;
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

export const deleteSubCategory = createAsyncThunk(
  "deleteSubCategory",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `/api/v1/admin/deleteSubCategory?id=${datas.id}`;
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

export const loadAllSubCategories = createAsyncThunk(
  "loadAllSubCategories",
  async (datas, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/v1/user/subcategories?Category=${datas.id}`,
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

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState: {
    subCategories: [],
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

    builder.addCase(addSubCategory.pending, (state, action) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(addSubCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state._id = action.payload._id;
    });
    builder.addCase(addSubCategory.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // updateCategory
    builder.addCase(updateSubCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateSubCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(updateSubCategory.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // deleteCategory
    builder.addCase(deleteSubCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteSubCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(deleteSubCategory.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // loadAllSubCategories
    builder.addCase(loadAllSubCategories.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loadAllSubCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.subCategories = action.payload.subCategories;
    });
    builder.addCase(loadAllSubCategories.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
  },
});

export const { addItem, clearState } = subCategorySlice.actions;
export default subCategorySlice.reducer;
