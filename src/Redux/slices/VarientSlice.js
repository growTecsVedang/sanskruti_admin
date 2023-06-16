import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addVarient = createAsyncThunk(
  "addVarient",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.ENDPOINT}/api/v1/admin/addVarient`;

      const headers = {
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

export const loadAllVarients = createAsyncThunk(
  "loadAllVarients",
  async ({ rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.ENDPOINT}/api/v1/user/getVarients`,
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

export const updateVarient = createAsyncThunk(
  "updateVarient",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.ENDPOINT}/api/v1/admin/updateVarient?id=${datas.id}`;
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

export const deleteVarient = createAsyncThunk(
  "deleteVarient",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.ENDPOINT}/api/v1/admin/deleteVarient?id=${datas.id}`;
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

    builder.addCase(addVarient.pending, (state, action) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(addVarient.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state._id = action.payload._id;
    });
    builder.addCase(addVarient.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // deleteVarient
    builder.addCase(deleteVarient.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteVarient.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(deleteVarient.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // updateVarient
    builder.addCase(updateVarient.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateVarient.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(updateVarient.rejected, (state, action) => {
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
