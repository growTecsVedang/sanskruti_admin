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
import { loadAllCategories } from "../../Redux/slices/CategorySlice";
import PieChartComponent from "../Charts/PieChart";
import generateData from "../../helper/resultData";
import generateDataForPieChart from "../../helper/pieChartData";

const Home = () => {
  const [allusers, setAllUsers] = useState(0);
  const [allproducts, setAllProducts] = useState(0);
  const [allOrders, setAllOrders] = useState(0);
  const [data, setData] = useState([]);
  const [piedata, setPieData] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { message, type, isAuthenticated, userCount, users } = useSelector(
    (state) => state.user
  );
  const { productCount, products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
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
        date: "",
        pay_status: "",
      })
    );
    dispatch(
      loadAllCategories({
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
    setData(generateData(categories, products));
    setPieData(generateDataForPieChart(users));
  }, [
    dispatch,
    type,
    message,
    history,
    userCount,
    productCount,
    orderCount,
    categories,
    products,
    users,
  ]);
  console.log(data);
  return (
    <div className=" flex flex-col overflow-y-scroll no-scroll  h-[89vh] w-[100%] lg:w-[80%]">
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
      <div className="flex flex-col lg:flex-row w-full ">
        <div className="lg:w-[60%] lg:ml-4 ">
          <BarChart data={data} />
        </div>
        <div className="lg:w-[40%]">
          <PieChartComponent data={piedata} />
        </div>
      </div>
      <OrderStat />
    </div>
  );
};

export default Home;
