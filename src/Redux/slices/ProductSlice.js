import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const loadAllProducts = createAsyncThunk(
  "loadAllProducts",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.sanskrutinx.in/api/v1/user/getallProducts`,
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

export const addProduct = createAsyncThunk(
  "addProduct",
  async (datas, { rejectWithValue }) => {
    console.log(datas);
    try {
      const url = `https://api.sanskrutinx.in/api/v1/admin/newProduct`;
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(url, datas.body, {
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

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `https://api.sanskrutinx.in/api/v1/admin/updateProduct?id=${datas.id}`;
      const headers = {
        "Content-Type": "application/json",
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

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `https://api.sanskrutinx.in/api/v1/admin/delete?id=${datas.id}`;
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

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productCount: 0,
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
    // loadAllProducts
    builder.addCase(loadAllProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loadAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.products = action.payload.products;
      state.productCount = action.payload.productCount;
    });
    builder.addCase(loadAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // addProduct

    builder.addCase(addProduct.pending, (state, action) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state._id = action.payload._id;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // updateProduct
    builder.addCase(updateProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // deleteProduct
    builder.addCase(deleteProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
  },
});

export const { addItem, clearState } = productSlice.actions;
export default productSlice.reducer;
