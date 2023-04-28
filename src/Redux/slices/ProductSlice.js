import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addItem } = productSlice.actions;
export default productSlice.reducer;