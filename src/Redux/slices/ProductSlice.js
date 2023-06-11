import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadAllProducts = createAsyncThunk(
  "loadAllProducts",
  async ({ rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/getallProducts", {
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

export const addProduct = createAsyncThunk(
  "addProduct",
  async (datas, { rejectWithValue }) => {
    try {
      const url = "/api/v1/admin/newProduct";
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(datas.body),
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

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `/api/v1/admin/delete?id=${datas.id}`;
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

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
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
