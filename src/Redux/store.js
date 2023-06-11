import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import userReducer from "./slices/UserSlice";
import categoryReducer from "./slices/CategorySlice";
import subCategoryReducer from "./slices/SubCategorySlice";
import varientReducer from "./slices/VarientSlice";
import loaduserReducer from "./slices/LoadUserSlice";
const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    loaduser: loaduserReducer,
    categories: categoryReducer,
    subcategories: subCategoryReducer,
    varients: varientReducer,
  },
});

export default store;
