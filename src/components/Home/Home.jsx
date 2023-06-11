import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import BarChart from "../Charts/BarChart";
import OrderStat from "./OrderStat";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { clearState } from "../../Redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { message, type, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const notify = (arg) => toast(`${arg}`);
    if (message && type) {
      if (type === "success") {
        notify(message);
        dispatch(clearState());
        history.push("/");
      } else {
        notify(message);
        console.log("called");
        dispatch(clearState());
      }
    }
  }, [dispatch, isAuthenticated, type, message, history]);
  return (
    <div className="">
      <Navbar />
      <div className=" flex w-[full] bg-[#edf2f4] opacity-80 ">
        <Sidebar />
        <div className=" flex flex-col overflow-y-scroll no-scroll  h-[100vh] w-[100%] lg:w-[80%]">
          <div className="flex flex-col lg:flex-row mx-3 mt-3 ">
            <div className="h-[100px] lg:ml-2 bg-[#f5dd90] w-full rounded-md flex flex-col justify-center  lg:w-[25%] mb-3  ">
              <h1 className="text-lg ml-5 ">Total products</h1>
              <p className="font-bold text-xl ml-5">53</p>
            </div>
            <div className="h-[100px] lg:ml-2 bg-[#aaa1c8] w-full rounded-md flex flex-col justify-center  lg:w-[25%] mb-3  ">
              <h1 className="text-lg ml-5 ">Total users</h1>
              <p className="font-bold text-xl ml-5">161</p>
            </div>
            <div className="h-[100px] lg:ml-2 bg-[#74c69d] w-full rounded-md flex flex-col justify-center  lg:w-[25%] mb-3  ">
              <h1 className="text-lg ml-5 ">Total orders</h1>
              <p className="font-bold text-xl ml-5">20</p>
            </div>
            <div className="h-[100px] lg:ml-2 bg-[#61a5c2] w-full rounded-md flex flex-col justify-center  lg:w-[25%] mb-3  ">
              <h1 className="text-lg ml-5 ">Total sells</h1>
              <p className="font-bold text-xl ml-5">15000&#8377; </p>
            </div>
          </div>
          <BarChart />
          <OrderStat />
        </div>
      </div>
    </div>
  );
};

export default Home;
