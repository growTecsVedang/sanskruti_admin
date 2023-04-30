import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Home/Sidebar";

const AttributeForm = () => {
  const [title, setTitle] = useState("");
  const [val, setVal] = useState("");
  const [arr, setArr] = useState([]);
  useEffect(() => {}, [arr]);

  function addAttribute() {
    if (val !== "") {
      var noDuplicate = false;
      arr.forEach((i) => {
        if (i === val) {
          noDuplicate = true;
        }
      });
      if (noDuplicate === false) {
        arr.push(val);
        setArr(arr);
        setVal("");
      }
    }
    console.log(arr.length);
  }
  return (
    <div>
      <Navbar />
      <div className=" flex w-[full] bg-[#edf2f4] ">
        <Sidebar />
        <div className="w-full ">
          <div className="w-[97%] mx-auto mt-5  min-h-[50px] bg-white  rounded-md flex flex-col     shadow-md ">
            <h1 className="text-xl h-[50px] flex  items-center pl-3 font-semibold ">
              Attribute Form
            </h1>
          </div>
          <div className="w-[97%] mx-auto mt-1  min-h-[300px] bg-white  rounded-md flex flex-col    shadow-md ">
            <form>
              <div className="flex flex-col w-[95%] h-full mx-auto mt-6 ">
                <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
                  Title
                </label>
                <input
                  value={title}
                  type="text"
                  onChange={(e) =>
                    setTitle(e.target.value.trim().toLowerCase())
                  }
                  className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                  placeholder="Title"
                />
              </div>
              <div className="w-[95%] mx-auto h-[80px] sm:h-[40px] lg:h-[40px] px-5 mt-3 rounded-md flex items-center bg-[#bde0fe]  ">
                To delete an attribute value , just make the field empty
              </div>
              <div className="w-[95%] flex flex-col mx-auto mt-6 ">
                <label htmlFor="" className="mb-4 text-lg text-gray-400">
                  Attribute values
                </label>
                <div className="w-full h-[60px] flex flex-row overflow-x-scroll ">
                  {arr.map((items, key) => {
                    return (
                      <input
                        key={key}
                        type="text"
                        value={items}
                        className=" w-[60px] h-[35px] rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 mr-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
                        placeholder="value"
                      />
                    );
                  })}
                  <input
                    value={val}
                    onChange={(e) =>
                      setVal(e.target.value.trim().toLowerCase())
                    }
                    type="text"
                    className=" w-[60px] h-[35px] rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
                    placeholder="value"
                  />
                </div>
                <div
                  onClick={() => addAttribute()}
                  className="w-[180px] h-[50px] bg-[#bde0fe] text-[#023e8a] flex items-center justify-center  rounded-md my-3 font-semibold cursor-pointer"
                >
                  Add attribute value
                </div>
                <div className="w-full h-[60px] flex items-center justify-end  ">
                  <div
                    type="submit"
                    className="w-[150px] h-[45px] bg-[#4361ee] text-white rounded-md flex items-center justify-center cursor-pointer "
                  >
                    Save & edit
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttributeForm;
