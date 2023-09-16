import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const loadAllOrders = createAsyncThunk(
  "loadAllOrders",
  async (datas, { rejectWithValue }) => {
    try {
      console.log(datas);
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/allOrders?date=${datas.date}&status=${datas.pay_status}`,
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

export const orderDetails = createAsyncThunk(
  "orderDetails",
  async (datas, { rejectWithValue }) => {
    try {
      console.log(datas);
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/getOrderDetails?id=${datas.id}`,
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

export const updateOrder = createAsyncThunk(
  "updateOrder",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/updateOrderStatus?id=${datas.id}`;
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
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/delete?id=${datas.id}`;
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

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    order: {},
    orderCount: 0,
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
    // loadAllOrders
    builder.addCase(loadAllOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loadAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.orders = action.payload.orders;
      state.orderCount = action.payload.orderCount;
    });
    builder.addCase(loadAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // orderDetails
    builder.addCase(orderDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(orderDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.order = action.payload.order;
    });
    builder.addCase(orderDetails.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // updateProduct
    builder.addCase(updateOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
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

export const { addItem, clearState } = orderSlice.actions;
export default orderSlice.reducer;
