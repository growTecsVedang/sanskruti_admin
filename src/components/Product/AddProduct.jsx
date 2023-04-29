import React from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Home/Sidebar";

const AddProduct = () => {
  return (
    <div className="">
      <Navbar />
      <div className=" flex w-[full] bg-[#edf2f4] opacity-80 ">
        <Sidebar />
        <div className=" flex flex-col overflow-y-scroll  h-[100vh] w-[100%] lg:w-[80%]">
          Add products
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
