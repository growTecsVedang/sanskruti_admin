import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const addSubBanner = createAsyncThunk(
  "addSubBanner",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/addSubBanner`;

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

export const loadAllSubBanners = createAsyncThunk(
  "loadAllSubBanners",
  async (datas, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          process.env.REACT_APP_ENDPOINT
        }/api/v1/user/getAllSubBanners?keyword=${
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

export const updateSubBanner = createAsyncThunk(
  "updateSubBanner",
  async (datas, { rejectWithValue }) => {
    console.log(datas);
    try {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/updateSubBanner?id=${datas.id}`;
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

export const deleteSubBanner = createAsyncThunk(
  "deleteSubBanner",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/deleteSubBanner?id=${datas.id}`;
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

const subbannerSlice = createSlice({
  name: "subbanner",
  initialState: {
    subBanners: [],
    banner: {},
    subBannerCount: 0,
    loading: false,
    error: null,
    message: "",
    type: "",
  },
  reducers: {
    clearState: (state) => {
      state.type = "";
    },
  },
  extraReducers: (builder) => {
    // addBanner
    builder.addCase(addSubBanner.pending, (state, action) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(addSubBanner.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(addSubBanner.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // deleteBanner
    builder.addCase(deleteSubBanner.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteSubBanner.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(deleteSubBanner.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // updateBanner
    builder.addCase(updateSubBanner.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateSubBanner.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(updateSubBanner.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // loadAllBanners
    builder.addCase(loadAllSubBanners.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loadAllSubBanners.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.subBanners = action.payload.subBanners;
      state.subBannerCount = action.payload.subBannerCount;
    });
    builder.addCase(loadAllSubBanners.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
  },
});

export const { addItem, clearState } = subbannerSlice.actions;
export default subbannerSlice.reducer;
