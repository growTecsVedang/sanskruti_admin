import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import BarChart from "../Charts/BarChart";
import OrderStat from "./OrderStat";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { clearState, loadAllUsers } from "../../Redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadAllProducts } from "../../Redux/slices/ProductSlice";
import { useState } from "react";
import { loadAllOrders } from "../../Redux/slices/OrderSlice";

const Home = () => {
  const [allusers, setAllUsers] = useState(0);
  const [allproducts, setAllProducts] = useState(0);
  const [allOrders, setAllOrders] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const { message, type, isAuthenticated, userCount } = useSelector(
    (state) => state.user
  );
  const { productCount } = useSelector((state) => state.products);
  const { orders, orderCount } = useSelector((state) => state.orders);

  function getCookie() {
    var name = "connect.sid".concat("=");
    var decodedCookie = document.cookie;
    var cookieArray = decodedCookie.split(";");

    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i].trim();
      if (cookie.startsWith(name)) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null; // Cookie not found
  }

  useEffect(() => {
    const cookie = getCookie();
    dispatch(
      loadAllUsers({
        cookie,
      })
    );
    dispatch(
      loadAllProducts({
        cookie,
      })
    );
    dispatch(
      loadAllOrders({
        cookie,
      })
    );
  }, []);

  useEffect(() => {
    const notify = (arg) => toast(`${arg}`);
    if (message && type) {
      notify(message);
      dispatch(clearState());
    }
    setAllUsers(userCount);
    setAllProducts(productCount);
    setAllOrders(orderCount);
  }, [dispatch, type, message, history, userCount, productCount, orderCount]);
  return (
    <div className="">
      <Navbar />
      <div className=" flex w-[full] bg-[#edf2f4] opacity-80 ">
        <Sidebar />
        <div className=" flex flex-col overflow-y-scroll no-scroll  h-[90vh] w-[100%] lg:w-[80%]">
          <div className="flex flex-col lg:flex-row mx-3 mt-3 ">
            <div className="h-[100px] lg:ml-2 bg-[#f5dd90] w-full rounded-md flex flex-col justify-center  lg:w-[25%] mb-3  ">
              <h1 className="text-lg ml-5 ">Total products</h1>
              <p className="font-bold text-xl ml-5">{allproducts}</p>
            </div>
            <div className="h-[100px] lg:ml-2 bg-[#aaa1c8] w-full rounded-md flex flex-col justify-center  lg:w-[25%] mb-3  ">
              <h1 className="text-lg ml-5 ">Total users</h1>
              <p className="font-bold text-xl ml-5">{allusers}</p>
            </div>
            <div className="h-[100px] lg:ml-2 bg-[#74c69d] w-full rounded-md flex flex-col justify-center  lg:w-[25%] mb-3  ">
              <h1 className="text-lg ml-5 ">Total orders</h1>
              <p className="font-bold text-xl ml-5">{allOrders}</p>
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
