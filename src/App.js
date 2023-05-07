import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignInOne } from "./components/SignInOne";
import { SignUpOne } from "./components/SignUpOne";
import Home from "./components/Home/Home";
import Products from "./components/Product/Products";
import Categories from "./components/Category/Categories";
import Attributes from "./components/Attributes/Attributes";
import AttributeForm from "./components/Attributes/AttributeForm";
import AddProduct from "./components/Product/AddProduct";
import CategoryForm from "./components/Category/CategoryForm";
import SubCategories from "./components/Subcategory/SubCategories";
import SubCategoryForm from "./components/Subcategory/SubCategoryForm";
import Banner from "./components/Banner/Banner";
import BannerForm from "./components/Banner/BannerForm";
import Orders from "./components/Orders/Orders";
import Permission from "./components/Permissions/Permission";
import EditPermission from "./components/Permissions/EditPermission";
import ViewUser from "./components/User/ViewUser";
import Users from "./components/User/Users";
import { SignUpWithEmail } from "./components/SignUpWithEmail";
import { SignInWithEmail } from "./components/SignInWithEmail";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignInOne />} />
        <Route path="/emailsignin" element={<SignInWithEmail />} />
        <Route path="/register" element={<SignUpOne />} />
        <Route path="/emailauth" element={<SignUpWithEmail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/attributes" element={<Attributes />} />
        <Route path="/attributeform" element={<AttributeForm />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/categoryform" element={<CategoryForm />} />
        <Route path="/subcategories" element={<SubCategories />} />
        <Route path="/subcategoryform" element={<SubCategoryForm />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/bannerform" element={<BannerForm />} />
        <Route path="/users" element={<Users />} />
        <Route path="/permissions" element={<Permission />} />
        <Route path="/editpermission" element={<EditPermission />} />
        <Route path="/viewuser" element={<ViewUser />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
