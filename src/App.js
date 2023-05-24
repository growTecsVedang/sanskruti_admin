import React from "react";
import { Route, Switch } from "react-router-dom";
import SignInOne from "./components/SignInOne";
import SignUpOne from "./components/SignUpOne";
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
import SignUpWithEmail from "./components/SignUpWithEmail";
import SignInWithEmail from "./components/SignInWithEmail";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="">
      <ToastContainer autoClose={2000} />
      <Switch>
        <Route exact path="/" component={SignInOne} />
        <Route exact path="/emailsignin" component={SignInWithEmail} />
        <Route exact path="/register" component={SignUpOne} />
        <Route exact path="/emailauth" component={SignUpWithEmail} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/attributes" component={Attributes} />
        <Route exact path="/attributeform" component={AttributeForm} />
        <Route exact path="/addproduct" component={AddProduct} />
        <Route exact path="/categoryform" component={CategoryForm} />
        <Route exact path="/subcategories" component={SubCategories} />
        <Route exact path="/subcategoryform" component={SubCategoryForm} />
        <Route exact path="/banner" component={Banner} />
        <Route exact path="/bannerform" component={BannerForm} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/permissions" component={Permission} />
        <Route exact path="/editpermission" component={EditPermission} />
        <Route exact path="/viewuser" component={ViewUser} />
        <Route exact path="/orders" component={Orders} />
      </Switch>
    </div>
  );
}

export default App;
