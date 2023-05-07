import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import userReducer from "./slices/UserSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
  },
});

export default store;
