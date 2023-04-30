import React from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Home/Sidebar";

const SubCategoryForm = () => {
  return (
    <div className="">
      <Navbar />
      <div className=" flex w-[full] bg-[#edf2f4] opacity-80 ">
        <Sidebar />

        <div className=" flex flex-col overflow-y-scroll   h-[100vh] w-[100%] lg:w-[80%] no-scroll ">
          <div className="w-[97%] mx-auto mt-2 mb-[1px] py-3 h-[50px] justify-center bg-white  rounded-md flex flex-col     shadow-md ">
            <h1 className="text-black lg:text-3xl text-2xl   pl-6 ">
              Sub Category Form
            </h1>
          </div>
          <div className="w-[97%] mx-auto  bg-white  rounded-md flex flex-col     shadow-md ">
            <form>
              <div class="  mt-5 flex items-center justify-center   w-[95%]   lg:w-[95%] mx-auto cursor-pointer ">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 "
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      class="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" />
                </label>
              </div>
              <div className="flex flex-col w-[95%]  mx-auto mt-5 ">
                <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
                  Title
                </label>
                <input
                  type="text"
                  className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                  placeholder="Title"
                />
              </div>
              <div className="w-[95%] mx-auto mt-[60px] flex  ">
                <h1 className="flex items-center text-lg text-gray-400 mr-4 ">
                  Category
                </h1>
                <select className="cursor-pointer h-[45px] min-w-[140px] pl-3  bg-gray-50 rounded-md text-lg border-2 border-gray-300 ">
                  <option value="category 1">category 1</option>
                  <option value="category 2">category 2</option>
                  <option value="category 3">category 3</option>
                  <option value="category 4">category 4</option>
                  <option value="category 5">category 5</option>
                </select>
              </div>
              <div className="flex flex-col w-[95%]  mx-auto mt-5 ">
                <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
                  Slug
                </label>
                <input
                  type="text"
                  className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                  placeholder="Slug"
                />
              </div>
              <div className="flex flex-col w-[95%]  mx-auto mt-5 ">
                <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
                  Meta Title
                </label>
                <input
                  type="text"
                  className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                  placeholder="Meta Title"
                />
              </div>
              <div className="flex flex-col w-[95%]  mx-auto mt-5 ">
                <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
                  Meta Description
                </label>
                <textarea
                  type="text"
                  className=" min-h-[250px] px-3 py-2 rounded-md border text-black border-gray-300 bg-transparent  text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                  placeholder="Meta Description"
                />
              </div>
              <div className="w-full pr-4 mt-3 h-[60px] flex items-center justify-end  ">
                <div
                  type="submit"
                  className="w-[150px] h-[45px]  bg-[#4361ee] text-white rounded-md flex items-center justify-center cursor-pointer "
                >
                  Save & edit
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryForm;
