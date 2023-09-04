import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const markdownDetails = createAsyncThunk(
  "markdowndetails",
  async (datas, { rejectWithValue }) => {
    try {
      console.log(datas);
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/user/getMarkdown?feild=${datas.feild}`,
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

export const updatemd = createAsyncThunk(
  "updatemd",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/addmarkdown`;
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

const markdownSlice = createSlice({
  name: "markdown",
  initialState: {
    md: "",
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
    // markdownDetails
    builder.addCase(markdownDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(markdownDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.md = action.payload.markdown;
    });
    builder.addCase(markdownDetails.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // updatemd
    builder.addCase(updatemd.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updatemd.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(updatemd.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
  },
});

export const { addItem, clearState } = markdownSlice.actions;
export default markdownSlice.reducer;
