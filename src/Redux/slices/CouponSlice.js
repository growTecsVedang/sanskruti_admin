import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addCoupon = createAsyncThunk(
  "addCoupon",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/coupons`;

      const headers = {
        "Content-Type": "application/json", // You may need to include other headers based on the API requirements
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

export const updateCoupon = createAsyncThunk(
  "updateCoupon",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/coupons`;
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

export const couponDetails = createAsyncThunk(
  "couponDetails",
  async (datas, { rejectWithValue }) => {
    try {
      console.log(datas);
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/couponDetail?id=${datas.id}`,
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

export const loadAllCoupons = createAsyncThunk(
  "loadAllCoupons",
  async (datas, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/allCoupons?keyword=${
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

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    coupons: [],
    coupon: {},
    loading: false,
    error: null,
    message: "",
    type: "",
  },
  reducers: {
    clearState: (state) => {
      state.type = "";
    },
    clearCoupon: (state) => {
      state.initialState = {};
    },
  },
  extraReducers: (builder) => {
    // addCoupon
    builder.addCase(addCoupon.pending, (state, action) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(addCoupon.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(addCoupon.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // loadAllVarients
    builder.addCase(loadAllCoupons.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loadAllCoupons.fulfilled, (state, action) => {
      state.loading = false;
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.coupons = action.payload.coupons;
    });
    builder.addCase(loadAllCoupons.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    // couponDetails
    builder.addCase(couponDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(couponDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.coupon = action.payload.coupon;
    });
    builder.addCase(couponDetails.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // updateCoupon
    builder.addCase(updateCoupon.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCoupon.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(updateCoupon.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
  },
});

export const { addItem, clearState } = couponSlice.actions;
export default couponSlice.reducer;
