import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Home/Sidebar";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllOrders,
  clearState,
  orderDetails,
  updateOrder,
} from "../../Redux/slices/OrderSlice";
const EditOrders = (props) => {
  const [delivery_status, setDelivery_status] = useState("");
  const [Return_status, setReturn_status] = useState("");
  const [cancelChecked, setCancelChecked] = useState(false);
  const [returnChecked, setReturnChecked] = useState(false);
  const { order, message, type, orderCount, loading } = useSelector(
    (state) => state.orders
  );
  const dispatch = useDispatch();

  function getCookie() {
    var name = "accessToken".concat("=");
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

  const handleInputCancelChange = (e) => {
    //const name = e.target.name
    //const value = e.target.value
    const { value } = e.target;

    if (value === "false") {
      setCancelChecked(true);
    } else {
      setCancelChecked(false);
    }
  };
  const handleInputReturnChange = (e) => {
    //const name = e.target.name
    //const value = e.target.value
    const { value } = e.target;

    if (value === "false") {
      setReturnChecked(true);
    } else {
      setReturnChecked(false);
    }
  };

  function handleOrderUpdate() {
    if (delivery_status !== "" && Return_status !== "") {
      dispatch(
        updateOrder({
          id: props.match.params.id,
          body: {
            deliveryStatus: delivery_status,
            returnStatus: Return_status,
            cancelRefundStatus: cancelChecked,
            returnRefundStatus: returnChecked,
          },
        })
      );
    }
  }
  useEffect(() => {
    if (order && order.order && order.payment) {
      setDelivery_status(order.order.deliveryInfo.status);
      setReturn_status(order.order.returnInfo.status);
      setCancelChecked(order.order.cancellationInfo.Amount_refunded);
      setReturnChecked(order.order.returnInfo.Amount_refunded);
    }
  }, [order]);

  console.log(delivery_status, Return_status, returnChecked, cancelChecked);

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
    const cookie = getCookie();
    const id = props.match.params.id;
    console.log(id);
    dispatch(
      orderDetails({
        cookie,
        id,
      })
    );
  }, [dispatch, type, message]);
  return (
    <div>
      <Navbar />
      <div className=" flex w-[full] bg-[#edf2f4] opacity-80 ">
        <Sidebar />
        {order && order.order && order.payment ? (
          <div className=" flex  flex-col overflow-y-scroll overflow-x-hidden  min-h-[100vh] w-[100%] lg:w-[80%] no-scroll  ">
            <div className="w-[97%] mx-auto mt-3 mb-[1px] py-3 min-h-full  bg-white  rounded-md flex flex-col shadow-md  ">
              <div className=" mx-4 flex flex-col lg:justify-between  lg:flex-row gap-y-4 ">
                <div className="flex flex-col">
                  <p className="font-bold">
                    Name :
                    <span className="font-normal ml-3 ">
                      {order.payment.shippingAddress.fullName}
                    </span>
                  </p>
                  {/* <p className="font-bold">Address :</p> */}
                  <p className="font-bold">
                    Phone No :
                    <span className="font-normal ml-3 ">
                      {order.payment.shippingAddress.contactNo}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col w-[450px] ">
                  <div className="flex  ">
                    <h1 className="font-semibold w-[40%] ">Order</h1>
                    <p className="">{order.order.orderId}</p>
                  </div>
                  <div className="flex ">
                    <h1 className="font-semibold w-[40%]">Shipping Status</h1>
                    <p>{order.order.deliveryInfo.status}</p>
                  </div>
                  <div className="flex ">
                    <h1 className="font-semibold w-[40%]">Payment Method</h1>
                    <p>{order.payment.paymentMethod}</p>
                  </div>
                  <div className="flex ">
                    <h1 className="font-semibold w-[40%]">Payment Status</h1>
                    <p>{order.payment.paymentInfo.status}</p>
                  </div>
                  <div className="flex ">
                    <h1 className="font-semibold w-[40%]">Date</h1>
                    <p>{order.payment.orderInfo.Date}</p>
                  </div>
                  <div className="flex ">
                    <h1 className="font-semibold w-[40%]">Amount</h1>
                    <p>Amount</p>
                  </div>
                </div>
              </div>
              <div className=" px-4 my-5 flex flex-col lg:justify-between  lg:flex-row gap-y-4 bg-white ">
                <div className="flex flex-col   lg:w-[60%]  ">
                  <h1 className="font-bold text-xl mt-4 ">Ordered Item</h1>
                  <div className="font-semibold flex gap-x-3 mt-5 ">
                    <div className="min-h-[150px] w-[120px] bg-slate-300">
                      <img
                        src={order.order.product.images[0]}
                        alt="product_img"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="underline  ">{order.order.product.name}</p>
                      <p className="">
                        Quantity :
                        <span className="ml-3">
                          {order.order.product.quantity}
                        </span>
                      </p>
                      {Object.keys(order.order.product.varient.variations).map(
                        (key, index) => {
                          return (
                            <p>
                              <span className="mr-3">{key} :</span>
                              {order.order.product.varient.variations[key]}
                            </p>
                          );
                        }
                      )}
                      <p className="">
                        Discount :
                        <span className="ml-3">
                          {order.order.product.varient.discount}
                        </span>
                      </p>
                      <p className="">
                        Quantity :
                        <span className="ml-3">
                          {order.order.product.varient.price}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-[450px] lg:mt-[65px] mt-5 ">
                  <div className="flex  ">
                    <h1 className="font-semibold w-[40%] ">Subtotal</h1>
                    <p className="">{order.order.product.varient.price}</p>
                  </div>
                  <div className="flex ">
                    <h1 className="font-semibold w-[40%]">Shipping Cost</h1>
                    <p>{order.payment.orderInfo.ShippingCost}</p>
                  </div>
                  <div className="flex ">
                    <h1 className="font-semibold w-[40%]">Gst(%)</h1>
                    <p>{order.order.product.gst_percent}</p>
                  </div>
                  <div className="flex ">
                    <h1 className="font-semibold w-[40%]">Total</h1>
                    <p>Total</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <hr className="mb-3" />
                <div className="flex flex-col gap-y-3 ">
                  <h1 className="text-black  text-xl  pl-4 ">Order Delivery</h1>
                  <div className="flex ml-4 gap-2 ">
                    <h1 className="font-semibold">Current Status :</h1>
                    <p>{order.order.deliveryInfo.status}</p>
                  </div>
                  <div className="w-[95%] mx-auto mt-2 flex  ">
                    <select
                      onChange={(e) => setDelivery_status(e.target.value)}
                      value={delivery_status}
                      className="cursor-pointer h-[40px] min-w-[120px] pl-3  bg-gray-50 rounded-md text-lg border-2 border-gray-300 "
                    >
                      <option value={""}>Status</option>
                      <option value={"Pending"}>Pending</option>
                      <option value={"Confirmed"}>Confirmed</option>
                      <option value={"Out for delivery"}>
                        Out For Delivery
                      </option>
                      <option value={"Delivered"}>Delivered</option>
                    </select>
                  </div>
                  <hr className="my-3" />
                  <h1 className="text-black text-xl  pl-4 ">
                    Order Cancellation
                  </h1>
                  <div className=" flex flex-wrap gap-2 ">
                    <div className="flex h-[30px] items-center">
                      <label
                        htmlFor=""
                        className="mb-1 ml-4 mr-3 text-xl text-gray-400 lg:flex lg:h-[30px] lg:items-center"
                      >
                        Request For Cancellation :-
                      </label>
                      {order.order.cancellationInfo.isCancelled ? (
                        <h1>Yes</h1>
                      ) : (
                        <h1>No</h1>
                      )}
                    </div>
                    <div className="flex h-[30px] items-center">
                      <label
                        htmlFor=""
                        className="mb-1 ml-4 mr-3 text-xl text-gray-400 lg:flex lg:h-[30px] lg:items-center"
                      >
                        Amount Refunded
                      </label>
                      <input
                        type="checkbox"
                        value={cancelChecked}
                        checked={cancelChecked}
                        onChange={handleInputCancelChange}
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </div>
                  </div>
                  <hr className="my-3" />
                  <h1 className="text-black  text-xl  pl-4 ">Order Return </h1>
                  <div className=" flex lg:flex-row flex-col  gap-2 ">
                    <div className="flex h-[30px] items-center">
                      <label
                        htmlFor=""
                        className="mb-1 ml-4 mr-3 text-xl text-gray-400 lg:flex lg:h-[30px] lg:items-center"
                      >
                        Request For Return :-
                      </label>
                      {order.order.returnInfo.isReturned ? (
                        <h1>Yes</h1>
                      ) : (
                        <h1>No</h1>
                      )}
                    </div>

                    <div className="flex h-[30px] items-center">
                      <label
                        htmlFor=""
                        className="mb-1 ml-4 mr-3 text-xl text-gray-400 lg:flex lg:h-[30px] lg:items-center"
                      >
                        Amount Creadited
                      </label>
                      <input
                        readOnly
                        type="checkbox"
                        value={returnChecked}
                        checked={returnChecked}
                        onChange={handleInputReturnChange}
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </div>
                    <div className="flex ml-4 gap-2 ">
                      <h1 className="font-semibold">Current Status :</h1>
                      <p>{order.order.returnInfo.status}</p>
                    </div>
                    <div className=" ml-4 flex  ">
                      <select
                        onChange={(e) => setReturn_status(e.target.value)}
                        value={Return_status}
                        className="cursor-pointer h-[40px] min-w-[150px] pl-3  bg-gray-50 rounded-md text-lg border-2 border-gray-300 "
                      >
                        <option value={""} hidden>
                          Return Status
                        </option>
                        <option value={"Pending"}>Pending</option>
                        <option value={"Confirmed"}>Confirmed</option>
                        <option value={"Out for pickup"}>Out For Pickup</option>
                        <option value={"Refund initiated"}>
                          Refund Initiated
                        </option>
                        <option value={"Refund credited"}>
                          Refund Credited
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-full pr-4 mt-3 h-[60px] flex items-center justify-end  ">
                  {!loading ? (
                    <button
                      onClick={() => handleOrderUpdate()}
                      className="text-white w-[140px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex justify-center items-center"
                    >
                      Save & edit
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
                      Updating...
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white w-full flex justify-center items-center h-[100vh] ">
            <svg
              aria-hidden="true"
              class="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditOrders;
