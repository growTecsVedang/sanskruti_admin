import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const addSubCategory = createAsyncThunk(
  "addSubCategory",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.ENDPOINT}/api/v1/admin/addSubCategory`;
      const headers = {
        "Content-Type": "application/json", // You may need to include other headers based on the API requirements
      };
      const response = await axios.post(url, datas, {
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

export const updateSubCategory = createAsyncThunk(
  "updateSubCategory",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.ENDPOINT}/api/v1/admin/updateSubCategory?id=${datas.id}`;
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

export const deleteSubCategory = createAsyncThunk(
  "deleteSubCategory",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.ENDPOINT}/api/v1/admin/deleteSubCategory?id=${datas.id}`;
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

export const loadAllSubCategories = createAsyncThunk(
  "loadAllSubCategories",
  async (datas, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.ENDPOINT}/api/v1/user/subcategories?keyword=${
          datas.keyword === undefined ? "" : datas.keyword
        }`,
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

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState: {
    subCategories: [],
    subCategoriesCount: 0,
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
      state.subCategoriesCount = action.payload.subCategoriesCount;
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
