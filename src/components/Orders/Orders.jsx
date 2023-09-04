import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import Sidebar from "../Home/Sidebar";
import Navbar from "../Home/Navbar";
import { toast } from "react-toastify";
import { loadAllOrders, clearState } from "../../Redux/slices/OrderSlice";
import { useDispatch, useSelector } from "react-redux";

const Orders = () => {
  const { orders, message, type, orderCount } = useSelector(
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
    dispatch(
      loadAllOrders({
        cookie,
      })
    );
  }, [dispatch, type, message]);

  const columns = [
    { field: "id", headerName: "id", minWidth: 200, flex: 0.5 },
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
      minWidth: 180,
      flex: 0.3,
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
            <button className="  px-2 w-[50px] bg-sky-200 rounded-sm font-semibold hover:underline  ">
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
        id: item.order._id,
        product: item.order.product.name,
        status: item.order.deliveryInfo.status,
        pay_method: item.payment.paymentMethod,
        created_at: item.payment.orderInfo.Date,
        quantity: item.order.product.quantity,
      });
    });

  return (
    <div className=" flex  flex-col overflow-y-scroll overflow-x-hidden  h-[90vh] w-[100%] lg:w-[80%] no-scroll  ">
      <div className=" ml-2 lg:ml-0 flex flex-col sm:flex-row lg:justify-end mt-3 lg:items-center gap-x-8  mr-2 min-h-[60px] ">
        <div className="mb-2 lg:mb-0 ">
          <label htmlFor="" className="font-semibold mr-14 lg:m-3 ">
            Date :-
          </label>
          <input type="date" className="h-[40px] border-2" />
        </div>
        <div>
          <label htmlFor="" className="font-semibold lg:m-3 ">
            Order Status :-
          </label>
          <select name="" id="" className="h-[40px] w-[180px] border-2">
            <option>All</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Out for pickup</option>
            <option>Refund initiated</option>
            <option>Refund credited</option>
          </select>
        </div>
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
