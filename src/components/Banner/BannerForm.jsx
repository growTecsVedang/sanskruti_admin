import React from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Home/Sidebar";
import { AiOutlineDelete } from "react-icons/ai";
const BannerForm = () => {
  return (
    <div className="">
      <Navbar />
      <div className=" flex w-[full] bg-[#edf2f4] opacity-80 ">
        <Sidebar />
        <div className=" flex flex-col overflow-y-scroll overflow-x-hidden no-scroll  h-[100vh] w-[100%] lg:w-[80%]">
          <div className="w-[97%] mx-auto mt-2 mb-[1px] py-3 h-[50px] justify-center bg-white  rounded-md flex flex-col     shadow-md ">
            <h1 className="text-black lg:text-3xl text-2xl   pl-6 ">
              Add Banner
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
              <div className="w-[95%] mx-auto mt-[60px] flex  ">
                <h1 className="flex items-center text-lg text-gray-400 mr-4 ">
                  Screen Type
                </h1>
                <select className="cursor-pointer h-[45px] min-w-[140px] pl-3  bg-gray-50 rounded-md text-lg border-2 border-gray-300 ">
                  <option value="category 1">Mobile</option>
                  <option value="category 2">Tablet</option>
                  <option value="category 3">Laptop</option>
                </select>
              </div>

              <div className="w-full pr-4 mt-3 h-[60px] flex items-center justify-end  ">
                <div
                  type="submit"
                  className="w-[150px] h-[45px]  bg-[#4361ee] text-white rounded-md flex items-center justify-center cursor-pointer "
                >
                  Save
                </div>
              </div>
            </form>
          </div>

          {/* display */}
          <div className="w-[97%] min-h-full   mx-auto mt-2 mb-[1px] py-3   bg-white  rounded-md flex flex-col     shadow-md">
            <h2 className="text-lg font-bold mt-5  mx-4 ">Mobile Fit</h2>
            <div className=" mt-5 mx-4  flex overflow-x-scroll w-full gap-x-6 h-[230px] overflow-y-hidden  ">
              <div className="">
                <div className="w-[250px] h-[150px] border-2 border-gray-200 "></div>
                <div className="w-[250px] h-[40px] flex justify-center items-center bg-gray-200 rounded-lg mt-3 active:bg-slate-300 ">
                  <span>{<AiOutlineDelete size={30} />}</span>
                </div>
              </div>
              <div>
                <div className="w-[250px] h-[150px] border-2 border-gray-200 "></div>
                <div className="w-[250px] h-[40px] flex justify-center items-center bg-gray-200 rounded-lg mt-3 active:bg-slate-300 ">
                  <span>{<AiOutlineDelete size={30} />}</span>
                </div>
              </div>
            </div>

            {/* tab */}
            <h2 className="text-lg font-bold mt-5  mx-4 ">Tablet Fit</h2>
            <div className=" mt-5 mx-4  flex overflow-x-scroll w-full gap-x-6 h-[230px] overflow-y-hidden  ">
              <div className="">
                <div className="w-[300px] h-[150px] border-2 border-gray-200 "></div>
                <div className="w-[300px] h-[40px] flex justify-center items-center bg-gray-200 rounded-lg mt-3 active:bg-slate-300 ">
                  <span>{<AiOutlineDelete size={30} />}</span>
                </div>
              </div>
              <div>
                <div className="w-[300px] h-[150px] border-2 border-gray-200 "></div>
                <div className="w-[300px] h-[40px] flex justify-center items-center bg-gray-200 rounded-lg mt-3 active:bg-slate-300 ">
                  <span>{<AiOutlineDelete size={30} />}</span>
                </div>
              </div>
            </div>

            {/* laptop  */}
            <h2 className="text-lg font-bold mt-5  mx-4 ">Laptop Fit</h2>
            <div className=" mt-5 mx-4  flex overflow-x-scroll w-full gap-x-6 h-[230px] overflow-y-hidden  ">
              <div className="">
                <div className="w-[400px] h-[150px] border-2 border-gray-200 "></div>
                <div className="w-[400px] h-[40px] flex justify-center items-center bg-gray-200 rounded-lg mt-3 active:bg-slate-300 ">
                  <span>{<AiOutlineDelete size={30} />}</span>
                </div>
              </div>
              <div>
                <div className="w-[400px] h-[150px] border-2 border-gray-200 "></div>
                <div className="w-[400px] h-[40px] flex justify-center items-center bg-gray-200 rounded-lg mt-3 active:bg-slate-300 ">
                  <span>{<AiOutlineDelete size={30} />}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerForm;
