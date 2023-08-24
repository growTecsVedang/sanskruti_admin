import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Home/Sidebar";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addVarient, clearState } from "../../Redux/slices/VarientSlice";

const CouponForm = () => {
  const [title, setTitle] = useState("");
  const { message, type } = useSelector((state) => state.varients);
  const [varientName, setVarientName] = useState("");
  const [disType, setDisType] = useState("");
  const [arr, setArr] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {}, [arr]);

  const varientSubmitHandler = (e) => {
    e.preventDefault();

    if (title !== "" && arr.length !== 0) {
      dispatch(
        addVarient({
          varientName: title,
          value: arr,
        })
      );
      setArr([]);
      setTitle("");
    }
  };

  console.log(disType);

  useEffect(() => {
    const notify = (arg) => toast(`${arg}`);
    if (message && type) {
      if (type === "success") {
        notify(message);
        dispatch(clearState());
      } else {
        notify(message);
        dispatch(clearState());
      }
    }
  }, [dispatch, type, message]);

  function deleteAttribute(k) {
    setArr(
      arr.filter((item, key) => {
        return key !== k;
      })
    );
  }

  function addAttribute() {
    if (varientName !== "") {
      var noDuplicate = false;
      arr.forEach((i) => {
        if (i === varientName.trim().toLowerCase()) {
          noDuplicate = true;
        }
      });
      if (noDuplicate === false) {
        arr.push(varientName.trim().toLowerCase());
        setArr(arr);
        setVarientName("");
      }
    }
  }
  return (
    <div className="w-full ">
      <div className="w-[97%] mx-auto mt-5  min-h-[50px] bg-white  rounded-md flex flex-col     shadow-md ">
        <h1 className="text-xl h-[50px] flex  items-center pl-3 font-semibold ">
          Coupon
          <span className=" pt-1 ml-2 h-[35px] w-[35px]">
            <img
              src="https://res.cloudinary.com/dqyvomyqy/image/upload/v1692711360/sanskurti_website/promo-code_zql3sh.png"
              alt=""
            />
          </span>
        </h1>
      </div>
      <div className="w-[97%] mx-auto mt-1  min-h-[300px] bg-white  rounded-md flex flex-col    shadow-md ">
        <form onSubmit={varientSubmitHandler}>
          <div className="flex flex-col w-[95%] h-full mx-auto mt-6 ">
            <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
              Name
            </label>
            <input
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value.trim().toLowerCase())}
              className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
              placeholder="Name"
            />
            <div className="my-3 flex  flex-col  gap-y-2 w-full">
              <div className=" flex my-2">
                <h1 className="flex items-center text-lg text-gray-400  mr-4 ">
                  Coupon Type
                </h1>
                <select className="cursor-pointer h-[45px] min-w-[140px] pl-3  bg-gray-50 rounded-md text-lg border-2 border-gray-300 ">
                  <option value="" hidden>
                    Type
                  </option>
                  <option value="oneTime">For OneTime Use</option>
                  <option value="multiple">For Multiple Time's Use</option>
                </select>
              </div>
              <div className="flex  w-full  lg:flex-row  lg:gap-x-4 flex-col gap-y-2 my-2">
                <div className="flex flex-col lg:flex-row lg:gap-x-3 lg:w-[50%]  ">
                  <label htmlFor="" className="my-2  text-lg text-gray-400 ">
                    MinPurchase
                  </label>
                  <input
                    value={title}
                    type="text"
                    onChange={(e) =>
                      setTitle(e.target.value.trim().toLowerCase())
                    }
                    className="w-[60%] h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                    placeholder="Value"
                  />
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-x-3 lg:w-[50%]  ">
                  <label htmlFor="" className="my-4  text-lg text-gray-400 ">
                    Code
                  </label>
                  <input
                    value={title}
                    type="text"
                    onChange={(e) =>
                      setTitle(e.target.value.trim().toLowerCase())
                    }
                    className="w-[60%] h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                    placeholder="Code"
                  />
                </div>
              </div>
              <div className="flex  w-full  lg:flex-row  lg:gap-x-4 flex-col gap-y-2 my-2">
                <div className=" flex my-2 w-[50%] ">
                  <h1 className="flex items-center text-lg text-gray-400  mr-4 ">
                    Discount Type
                  </h1>
                  <select
                    onChange={(e) => setDisType(e.target.value)}
                    value={disType}
                    className="cursor-pointer h-[45px] min-w-[140px] pl-3  bg-gray-50 rounded-md text-lg border-2 border-gray-300 "
                  >
                    <option value="" hidden>
                      Type
                    </option>
                    <option value="percentage">Percentage</option>
                    <option value="price">Price</option>
                  </select>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-x-3 lg:w-[50%]  ">
                  <label htmlFor="" className="my-4   text-lg text-gray-400 ">
                    Value
                  </label>
                  <input
                    value={title}
                    type="text"
                    onChange={(e) =>
                      setTitle(e.target.value.trim().toLowerCase())
                    }
                    className="w-[60%] h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                    placeholder={
                      disType === "percentage"
                        ? "value as Discount in %"
                        : "value in Rs"
                    }
                  />
                </div>
              </div>
              <div className="flex items-center gap-x-3">
                <label htmlFor="" className="my-4  text-lg text-gray-400 ">
                  Expiration Date :
                </label>
                <input
                  type="date"
                  className=" cursor-pointer border border-black h-[30px] rounded-md "
                />
              </div>
            </div>
          </div>
          <div className="w-[95%] flex flex-col mx-auto mt-6 ">
            <div className="w-full h-[60px] flex items-center justify-end  ">
              <button
                type="submit"
                className="w-[150px] h-[45px] bg-[#4361ee] text-white rounded-md flex items-center justify-center cursor-pointer "
              >
                Generate
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponForm;
