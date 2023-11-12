import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loadAllOrders, clearState } from "../../Redux/slices/OrderSlice";
import { useDispatch, useSelector } from "react-redux";

const Orders = () => {
  const { orders, message, type, orderCount, loading } = useSelector(
    (state) => state.orders
  );
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [pay_status, setPay_Status] = useState("");
  const [pay_category, setPay_Category] = useState("");

  const obj̣ = [
    {
      name: "",
      label: "Order Status",
      feilds: [],
    },
    {
      name: "On delivery",
      label: "Delivery Status",
      feilds: [
        {
          name: "All",
          value: "",
        },
        {
          name: "Pending",
          value: "Pending",
        },
        {
          name: "Confirmed",
          value: "Confirmed",
        },
        {
          name: "Out for Delivery",
          value: "Out for delivery",
        },
        {
          name: "Delivered",
          value: "Delivered",
        },
      ],
    },
    {
      name: "On return",
      label: "Return Status",
      feilds: [
        {
          name: "All",
          value: "",
        },
        {
          name: "Pending",
          value: "Pending",
        },
        {
          name: "Confirmed",
          value: "Confirmed",
        },
        {
          name: "Out for Pickup",
          value: "Out for pickup",
        },
        {
          name: "Refund Initiated",
          value: "Refund initiated",
        },
        {
          name: "Refund Credited",
          value: "Refund credited",
        },
      ],
    },
    {
      name: "Cancelled",
      label: "Cancel Status",
      feilds: [
        {
          name: "All",
          value: "",
        },
        {
          name: "Not Refunded",
          value: "false",
        },
        {
          name: "Refunded",
          value: "true",
        },
      ],
    },
  ];

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
    async function request() {
      dispatch(
        loadAllOrders({
          cookie,
          date,
          pay_status,
          type: pay_category,
        })
      );
    }
    request();
  }, [dispatch, type, message, pay_status, date, pay_category]);

  const columns = [
    { field: "order_id", headerName: "order id", minWidth: 350, flex: 1.5 },
    {
      field: "product",
      headerName: "Product",
      minWidth: 180,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 180,
      flex: 0.5,
    },

    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 180,
      flex: 0.2,
    },
    {
      field: "pay_method",
      headerName: "Payment",
      minWidth: 180,
      flex: 0.5,
    },
    {
      field: "created_at",
      headerName: "Created At",
      minWidth: 250,
      flex: 0.5,
      renderCell: (params) => {
        const time = new Date(params.row.created_at)?.toLocaleDateString(
          "en-IN",
          {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        );
        return time;
      },
    },

    {
      field: "actions",
      flex: 0.1,
      headerName: "Actions",
      minWidth: 60,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <button className="  px-2 w-[50px] bg-sky-300 rounded-lg font-semibold hover:underline  ">
              <Link to={`/vieworder/${params.id}`}>View</Link>
            </button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item.order.order._id,
        order_id: item.order.order.orderId,
        product: item.order.order.product.name,
        status: item.order.order.deliveryInfo.status,
        pay_method: item.order.payment.paymentMethod,
        pay_method1: item.order.payment.paymentInfo.length,
        created_at: new Date(item.order.payment.orderInfo.Date).getTime(),
        quantity: item.order.order.product.quantity,
      });
    });
  console.log(orders);

  useEffect(() => {
    setPay_Category("");
  }, [pay_status]);

  return (
    <div className=" flex  flex-col overflow-y-scroll overflow-x-hidden  h-[89vh] w-[100%] lg:w-[80%] no-scroll  ">
      <div className=" ml-2 lg:ml-0 flex flex-col sm:flex-row lg:justify-end mt-3 lg:items-center gap-x-8  mr-2 min-h-[60px] ">
        <div className="mb-2 lg:mb-0 ">
          <label htmlFor="" className="font-semibold mr-14 lg:m-3 ">
            Date :-
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-[40px] border-2"
          />
        </div>
        <div className="mb-2 lg:mb-0">
          <label htmlFor="" className="font-semibold lg:m-3 ">
            Order Type :-
          </label>
          <select
            name=""
            value={pay_status}
            onChange={(e) => setPay_Status(e.target.value)}
            id=""
            className="h-[40px] w-[180px] border-2"
          >
            <option value="">All</option>
            <option>On delivery</option>
            <option>On return</option>
            <option>Cancelled</option>
          </select>
        </div>
        {obj̣
          .filter((item) => {
            return item.name === pay_status;
          })
          .map((i) => {
            return (
              <div>
                <label htmlFor="" className="font-semibold lg:m-3 ">
                  {i.label} :-
                </label>
                <select
                  name=""
                  value={pay_category}
                  onChange={(e) => setPay_Category(e.target.value)}
                  id=""
                  className="h-[40px] w-[180px] border-2"
                >
                  {i.feilds.map((j) => {
                    return <option value={j.value}>{j.name}</option>;
                  })}
                </select>
              </div>
            );
          })}
      </div>
      <div className="flex flex-col ml-5 ">
        <p className="mx-[10%] lg:mx-[1%] my-3">Showing Results {orderCount}</p>
      </div>

      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        className="productListTable"
        rowHeight={60}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 8, page: 0 },
          },
        }}
      />
    </div>
  );
};

export default Orders;
