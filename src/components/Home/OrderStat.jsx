import React from "react";

const OrderStat = () => {
  return (
    <div className="mx-3">
      <div className="flex flex-col lg:flex-row  mt-3 ">
        <div className="h-[90px] lg:ml-2 bg-white  w-full rounded-md flex flex-col justify-center  mb-3   shadow-md   ">
          <h1 className="text-xl pl-4 ">
            <b>Order Statistics</b>
          </h1>
        </div>
      </div>
      <div className="flex flex-col flex-wrap lg:flex-row sm:flex-row ">
        <div className="h-[120px] lg:mx-auto bg-white  w-full lg:w-[49%] sm:ml-2 sm:w-[32%] rounded-md flex flex-col justify-center  mb-3   shadow-lg   ">
          <p className="text-xl pl-4 ">
            <h1>Order cancelled</h1>
            <h2 className="text-4xl ">13</h2>
          </p>
        </div>
        <div className="h-[120px] lg:mx-auto bg-white  w-full lg:w-[49%] sm:ml-2 sm:w-[32%] rounded-md flex flex-col justify-center  mb-3   shadow-lg   ">
          <p className="text-xl pl-4 ">
            <h1>Pending orders</h1>
            <h2 className="text-4xl ">77</h2>
          </p>
        </div>
        <div className="h-[120px] lg:mx-auto bg-white  w-full lg:w-[49%] sm:ml-2 sm:w-[32%]  rounded-md flex flex-col justify-center  mb-3   shadow-lg   ">
          <p className="text-xl pl-4 ">
            <h1>Confirmed Orders</h1>
            <h2 className="text-4xl ">0</h2>
          </p>
        </div>
        <div className="h-[120px] lg:mx-auto bg-white  w-full lg:w-[49%] sm:ml-2 sm:w-[32%]  rounded-md flex flex-col justify-center  mb-3   shadow-lg   ">
          <p className="text-xl pl-4 ">
            <h1>Package picked up</h1>
            <h2 className="text-4xl ">0</h2>
          </p>
        </div>
        <div className="h-[120px] lg:mx-auto bg-white  w-full lg:w-[49%] sm:ml-2 sm:w-[32%]  rounded-md flex flex-col justify-center  mb-3   shadow-lg   ">
          <p className="text-xl pl-4 ">
            <h1>On the way</h1>
            <h2 className="text-4xl ">0</h2>
          </p>
        </div>

        <div className="h-[120px] lg:mx-auto bg-white  w-full lg:w-[49%]  sm:ml-2 sm:w-[32%]  rounded-md flex flex-col justify-center  mb-3   shadow-lg   ">
          <p className="text-xl pl-4 ">
            <h1>Delivered</h1>
            <h2 className="text-4xl ">0</h2>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderStat;
