import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addAndUpdateVarient = createAsyncThunk(
  "addAndUpdateVarient",
  async (datas, { rejectWithValue }) => {
    try {
      console.log(datas);
      const url = "/api/v1/admin/updateVarient";
      const token = datas.accessToken;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // You may need to include other headers based on the API requirements
      };
      const response = await fetch(url, {
        method: "PUT",
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
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const loadAllVarients = createAsyncThunk(
  "loadAllVarients",
  async ({ rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/getVarients", {
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

const varientSlice = createSlice({
  name: "varient",
  initialState: {
    varients: [],
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
    // addCategory

    builder.addCase(addAndUpdateVarient.pending, (state, action) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(addAndUpdateVarient.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state._id = action.payload._id;
    });
    builder.addCase(addAndUpdateVarient.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // loadAllVarients
    builder.addCase(loadAllVarients.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loadAllVarients.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.varients = action.payload.varients;
    });
    builder.addCase(loadAllVarients.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
  },
});

export const { addItem, clearState } = varientSlice.actions;
export default varientSlice.reducer;
