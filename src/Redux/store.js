import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import userReducer from "./slices/UserSlice";
import categoryReducer from "./slices/CategorySlice";
import subCategoryReducer from "./slices/SubCategorySlice";
import varientReducer from "./slices/VarientSlice";
const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    categories: categoryReducer,
    subcategories: subCategoryReducer,
    varients: varientReducer,
  },
});

export default store;
