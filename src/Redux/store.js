import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import userReducer from "./slices/UserSlice";
import categoryReducer from "./slices/CategorySlice";
import subCategoryReducer from "./slices/SubCategorySlice";
import varientReducer from "./slices/VarientSlice";
import loaduserReducer from "./slices/LoadUserSlice";
import bannerReducer from "./slices/BannerSlice";
import subbannerReducer from "./slices/SubBannerSlice";
import orderReducer from "./slices/OrderSlice";
const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    loaduser: loaduserReducer,
    categories: categoryReducer,
    subcategories: subCategoryReducer,
    varients: varientReducer,
    banners: bannerReducer,
    subbanners: subbannerReducer,
    orders: orderReducer,
  },
});

export default store;
