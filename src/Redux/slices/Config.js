import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const addSocials = createAsyncThunk(
  "addSocials",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/social`;
      const headers = {
        "Content-Type": "application/json",
      };
      console.log(datas);

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

export const deleteSocialImage = createAsyncThunk(
  "deleteSocialImage",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/social/deleteImage?id=${datas.id}&name=${datas.name}`;
      const headers = {
        "Content-Type": "application/json",
      };
      console.log(datas);
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
      return rejectWithValue(error.message.data);
    }
  }
);

export const getSocial = createAsyncThunk(
  "getSocial",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/social?id=${datas.id}`;
      const headers = {
        "Content-Type": "application/json ; charset=utf-8",
      };
      console.log("exec1", datas.id);
      const response = await axios.get(url, {
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
      return rejectWithValue(error.message.data);
    }
  }
);

// export const addCategoryImage = createAsyncThunk(
//   "addCategoryImage",
//   async (datas, { rejectWithValue }) => {
//     console.log(datas);
//     try {
//       const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/addCategoryImage?_id=${datas._id}`;
//       const headers = {
//         // You may need to include other headers based on the API requirements
//         "Content-Type": "application/json",
//       };

//       const response = await axios.post(url, datas.body, {
//         headers,
//         withCredentials: true,
//       });

//       if (response.status === 409 || response.status === 404) {
//         const payload = response.data;
//         return rejectWithValue(payload);
//       }

//       const data = response.data;
//       return data;
//     } catch (error) {
//       console.log(error.message);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const loadAllSocials = createAsyncThunk(
  "loadAllSocials",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/user/getSocials`,
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
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const deleteCategoryImage = createAsyncThunk(
//   "deleteCategoryImage",
//   async (datas, { rejectWithValue }) => {
//     try {
//       const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/deleteCategoryImage?_id=${datas.id}&name=${datas.name}`;
//       console.log(datas.name);

//       const headers = {
//         "Content-Type": "application/json; charset=utf-8",
//       };
//       const response = await axios.delete(url, {
//         headers,
//         withCredentials: true,
//       });

//       if (response.status === 409 || response.status === 404) {
//         const payload = response.data;
//         return rejectWithValue(payload);
//       }

//       const data = response.data;
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const deleteSocials = createAsyncThunk(
  "deleteSocials",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/social?id=${datas.id}`;
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

export const updateSocials = createAsyncThunk(
  "updateSocials",
  async (datas, { rejectWithValue }) => {
    try {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/social?id=${datas.body.id}`;
      const headers = {
        "Content-Type": "application/json; charset=utf-8",
      };
      console.log(datas);
      const response = await axios.put(
        url,
        { ...datas.body },
        {
          headers,
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

// export const searchCategory = createAsyncThunk(
//   "searchCategory",
//   async (datas, { rejectWithValue }) => {
//     try {
//       const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/user/categories?keyword=${datas.value}`;
//       const headers = {
//         "Content-Type": "application/json; charset=utf-8",
//       };
//       const response = await axios.get(url, {
//         headers,
//         withCredentials: true,
//       });
//       console.log(response.data);

//       if (response.status === 409 || response.status === 404) {
//         const payload = response.data;
//         return rejectWithValue(payload);
//       }

//       const data = response.data;
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const configurationSlice = createSlice({
  name: "config",
  initialState: {
    socials: [],
    obj: {},
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

    builder.addCase(addSocials.pending, (state, action) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(addSocials.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state._id = action.payload._id;
    });
    builder.addCase(addSocials.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // // addCategoryImage

    // builder.addCase(addCategoryImage.pending, (state, action) => {
    //   state.loading = true;
    //   state.message = "";
    // });
    // builder.addCase(addCategoryImage.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.message = action.payload.message;
    //   state.type = action.payload.type;
    // });
    // builder.addCase(addCategoryImage.rejected, (state, action) => {
    //   state.loading = false;
    //   state.message = action.payload.message;
    //   state.type = action.payload.type;
    // });

    // loadAllSocials
    builder.addCase(loadAllSocials.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loadAllSocials.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.socials = action.payload.arr;
    });
    builder.addCase(loadAllSocials.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // getSocial
    builder.addCase(getSocial.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSocial.fulfilled, (state, action) => {
      state.loading = false;
      state.type = action.payload.type;
      state.obj = action.payload.data[0];
    });
    builder.addCase(getSocial.rejected, (state, action) => {
      state.loading = false;
      state.type = action.payload.type;
    });

    // deleteSocials
    builder.addCase(deleteSocials.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteSocials.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(deleteSocials.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // deleteSocialImage
    builder.addCase(deleteSocialImage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteSocialImage.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(deleteSocialImage.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // updateSocials
    builder.addCase(updateSocials.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateSocials.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(updateSocials.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.type = action.payload.type;
    });

    // // searchCategory
    // builder.addCase(searchCategory.pending, (state, action) => {
    //   state.loading = true;
    // });
    // builder.addCase(searchCategory.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.message = action.payload.message;
    //   state.type = action.payload.type;
    //   state.categories = action.payload.categories;
    //   state.categoryCount = action.payload.categoryCount;
    // });
    // builder.addCase(searchCategory.rejected, (state, action) => {
    //   state.loading = false;
    //   state.message = action.payload.message;
    //   state.type = action.payload.type;
    // });
  },
});

export const { addItem, clearState } = configurationSlice.actions;
export default configurationSlice.reducer;
