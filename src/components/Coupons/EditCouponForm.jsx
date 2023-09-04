import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Home/Sidebar";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import {
  clearState,
  updateCoupon,
  addCoupon,
  couponDetails,
} from "../../Redux/slices/CouponSlice";

const EditCouponForm = (props) => {
  const [name, setName] = useState("");
  const [minpurchase, setMinpurchase] = useState(0);
  const [code, setCode] = useState("");
  const [code1, setCode1] = useState("");
  const [value, setValue] = useState(0);
  const [ctype, setCtype] = useState("");
  const { message, type, loading, coupon } = useSelector(
    (state) => state.coupons
  );
  const [disType, setDisType] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const couponSubmitHandler = (e) => {
    e.preventDefault();
    const newDate = new Date(date);
    newDate.setHours(23);
    newDate.setMinutes(59);
    newDate.setSeconds(59);

    if (
      name !== "" &&
      code !== "" &&
      ctype !== "" &&
      disType !== "" &&
      value !== 0 &&
      minpurchase !== 0 &&
      newDate !== ""
    ) {
      dispatch(
        updateCoupon({
          body: {
            previousCode: code1,
            name,
            code,
            type: ctype,
            discountType: disType,
            value: Number(value),
            minPurchase: Number(minpurchase),
            expirationDate: newDate,
          },
        })
      );
      const id = props.match.params.id;
      dispatch(
        couponDetails({
          id,
        })
      );
    }
  };

  useEffect(() => {
    if (coupon) {
      setName(coupon.name);
      setCode(coupon.code);
      setCode1(coupon.code);
      setCtype(coupon.type);
      setDisType(coupon.discountType);
      setValue(coupon.value);
      setMinpurchase(coupon.minPurchase);
      const originalDate = coupon.expirationDate;
      const formattedDate = moment(originalDate).format("YYYY-MM-DD");
      setDate(formattedDate);
    }
  }, [coupon]);

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
    const id = props.match.params.id;
    dispatch(
      couponDetails({
        id,
      })
    );
  }, [dispatch, type, message]);
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
        <form onSubmit={couponSubmitHandler}>
          <div className="flex flex-col w-[95%] h-full mx-auto mt-6 ">
            <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
              Name
            </label>
            <input
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
              placeholder="Name"
            />
            <div className="my-3 flex  flex-col  gap-y-2 w-full">
              <div className=" flex my-2">
                <h1 className="flex items-center text-lg text-gray-400  mr-4 ">
                  Coupon Type
                </h1>
                <select
                  value={ctype}
                  onChange={(e) => setCtype(e.target.value)}
                  className="cursor-pointer h-[45px] min-w-[140px] pl-3  bg-gray-50 rounded-md text-lg border-2 border-gray-300 "
                >
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
                    value={minpurchase}
                    type="number"
                    onChange={(e) => setMinpurchase(e.target.value)}
                    className="w-[60%] h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                    placeholder="Value"
                  />
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-x-3 lg:w-[50%]  ">
                  <label htmlFor="" className="my-4  text-lg text-gray-400 ">
                    Code
                  </label>
                  <input
                    value={code}
                    maxLength={6}
                    type="text"
                    onChange={(e) => setCode(e.target.value)}
                    className="w-[60%] h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                    placeholder=" Not more than 6 character"
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
                    <span className="font-bold">
                      {disType !== ""
                        ? disType === "percentage"
                          ? " (%)"
                          : " (Rs)"
                        : ""}
                    </span>
                  </label>
                  <input
                    value={value}
                    type="text"
                    onChange={(e) =>
                      setValue(e.target.value.trim().toLowerCase())
                    }
                    className="w-[60%] h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                    placeholder="value"
                  />
                </div>
              </div>
              <div className="flex items-center gap-x-3">
                <label htmlFor="" className="my-4  text-lg text-gray-400 ">
                  Expiration Date :
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className=" cursor-pointer border border-black h-[30px] rounded-md "
                />
              </div>
            </div>
          </div>
          <div className="w-[95%] flex flex-col items-end mx-auto my-6 ">
            {!loading ? (
              <button
                type="submit"
                className="text-white w-[140px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex justify-center items-center"
              >
                Update
              </button>
            ) : (
              <button
                disabled
                type="button"
                class="text-white bg-blue-700 w-[140px] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Generating...
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCouponForm;
