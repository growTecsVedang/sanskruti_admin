import React from "react";
import Sidebar from "../Home/Sidebar";
import Navbar from "../Home/Navbar";
const EditPermission = () => {
  return (
    <div className="">
      <Navbar />
      <div className=" flex w-[full] bg-[#edf2f4] opacity-80 ">
        <Sidebar />
        <div className=" flex flex-col overflow-y-scroll no-scroll  h-[100vh] w-[100%] lg:w-[80%]">
          <div className="flex flex-col gap-x-3  lg:flex-row ">
            <div className=" w-[97%]   lg:min-w-[45%] mx-auto mt-5  min-h-[50px] bg-white  rounded-md flex flex-col     shadow-md ">
              <h1 className="text-xl h-[50px] flex  items-center pl-3 font-semibold ">
                User Details
              </h1>
              <div className="flex  min-h-[200px]  ">
                <div className=" w-[120px] h-full p-2 border-r-2   ">
                  <img
                    className="border-2"
                    src="https://res.cloudinary.com/dqyvomyqy/image/upload/v1683034362/user_2_mkh7hm.png"
                    alt="userIcon"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-center mt-3 font-bold ">user101</h1>
                  </div>
                </div>
                <div className="flex flex-col w-[70%] ">
                  <div className="flex mx-2 flex-grow flex-col">
                    <label htmlFor="" className="font-semibold my-1 ">
                      Email
                    </label>
                    <input
                      value="localadmin123@gmail.com "
                      readOnly
                      className="h-[30px] w-full pl-3 my-1  rounded-md border text-black border-gray-300"
                    />
                  </div>
                  <div className="flex mx-2 flex-grow flex-col">
                    <label htmlFor="" className="font-semibold my-1 ">
                      Provider
                    </label>
                    <input
                      value="Google"
                      readOnly
                      className="h-[30px] w-full pl-3 my-1  rounded-md border text-black border-gray-300"
                    />
                  </div>
                  <div className="flex mx-2 flex-grow flex-col">
                    <label htmlFor="" className="font-semibold my-1 ">
                      Role
                    </label>
                    <input
                      value="ADMIN"
                      readOnly
                      className="h-[30px] w-full pl-3 my-1  rounded-md border text-black border-gray-300"
                    />
                  </div>
                  <div className="flex mx-2 flex-grow flex-col">
                    <label htmlFor="" className="font-semibold my-1 ">
                      D.O.B
                    </label>
                    <input
                      value="20/08/2002 "
                      readOnly
                      className="h-[30px] w-full pl-3 my-1  rounded-md border text-black border-gray-300"
                    />
                  </div>
                  <div className="flex mx-2 flex-grow flex-col">
                    <label htmlFor="" className="font-semibold my-1 ">
                      Mobile.No
                    </label>
                    <input
                      value="9158674444"
                      readOnly
                      className="h-[30px] w-full pl-3 my-1  rounded-md border text-black border-gray-300"
                    />
                  </div>
                  <div className="flex mx-2 flex-grow flex-col">
                    <label htmlFor="" className="font-semibold my-1 ">
                      Address
                    </label>
                    <textarea
                      value="Near Wadala Bridge Wadala 400037 Mumbai"
                      readOnly
                      className="h-[100px] w-full pl-3 my-1  rounded-md border text-black border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-[97%]  lg:flex-grow mx-auto mt-5  min-h-[50px] bg-white  rounded-md flex flex-col     shadow-md ">
              <h1 className="text-xl mb-4  h-[50px] flex  items-center pl-3 font-semibold ">
                Update User Role
              </h1>
              <div className="">
                <form>
                  <div className="w-[95%] mx-auto  flex  ">
                    <h1 className="flex items-center text-2xl text-gray-400 mr-4 ">
                      Role
                    </h1>
                    <select className="cursor-pointer h-[45px] min-w-[140px] pl-3  bg-gray-50 rounded-md text-lg border-2 border-gray-300 ">
                      <option value="category 1">USER</option>
                      <option value="category 2">ADMIN</option>
                      <option value="category 3">SUPERADMIN</option>
                    </select>
                  </div>
                  <div className="w-full flex justify-end ">
                    <button
                      type="submit"
                      className="  mr-3 mb-2  mt-4 lg:mt-6 px-2 h-[45px] w-[80px] lg:w-[100px] cursor-pointer  flex justify-center items-center rounded-md border-[1px] border-gray-300  bg-[#4361ee] text-white"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPermission;
