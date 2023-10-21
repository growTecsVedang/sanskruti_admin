import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const addBanner = createAsyncThunk(
  "addBanner",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/addBanner`;

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

export const loadAllBanners = createAsyncThunk(
  "loadAllBanners",
  async (datas, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/user/getAllBanners?keyword=${
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

export const updateBanner = createAsyncThunk(
  "updateBanner",
  async (datas, { rejectWithValue }) => {
    console.log(datas);
    try {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/updateBanner?id=${datas.id}`;
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

export const deleteBannerImage = createAsyncThunk(
  "deleteBannerImage",
  async (datas, { rejectWithValue }) => {
    console.log(datas);
    try {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/deleteBannerImage?_id=${datas._id}&name=${datas.name}&type=${datas.type}`;
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

export const deleteBanner = createAsyncThunk(
  "deleteBanner",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/deleteBanner?id=${datas.id}`;
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

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banners: [],
    banner: {},
    bannerCount: 0,
    loading: false,
    error: null,
    message: "",
    type: "",
  },
  reducers: {
    clearState: (state) => {
      state.type = "";
    },
    clearBanner: (state) => {
      state.initialState = {};
    },
  },
  extraReducers: (builder) => {
    // addBanner
    builder.addCase(addBanner.pending, (state, action) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(addBanner.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(addBanner.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // deleteBannerImage
    builder.addCase(deleteBannerImage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteBannerImage.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(deleteBannerImage.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // deleteBanner
    builder.addCase(deleteBanner.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteBanner.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(deleteBanner.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // updateBanner
    builder.addCase(updateBanner.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateBanner.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(updateBanner.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // loadAllBanners
    builder.addCase(loadAllBanners.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loadAllBanners.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.banners = action.payload.banners;
      state.bannerCount = action.payload.bannerCount;
    });
    builder.addCase(loadAllBanners.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
  },
});

export const { addItem, clearState } = bannerSlice.actions;
export default bannerSlice.reducer;
