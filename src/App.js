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

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<SignInOne />} />
        <Route path="/register" element={<SignUpOne />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/attributes" element={<Attributes />} />
        <Route path="/attributeform" element={<AttributeForm />} />
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default App;
