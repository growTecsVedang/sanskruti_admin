import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import userReducer from "./slices/UserSlice";
import categoryReducer from "./slices/CategorySlice";
const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    categories: categoryReducer,
  },
});

export default store;
