import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignInOne } from "./components/SignInOne";
import { SignUpOne } from "./components/SignUpOne";
import Home from "./components/Home/Home";
import Products from "./components/Product/Products";
import Categories from "./components/Category/Categories";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignInOne />} />
        <Route path="/register" element={<SignUpOne />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </>
  );
}

export default App;
