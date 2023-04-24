import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignInOne } from "./components/SignInOne";
import { SignUpOne } from "./components/SignUpOne";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignInOne />} />
        <Route path="/register" element={<SignUpOne />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
