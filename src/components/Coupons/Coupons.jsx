import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loadAllCoupons, clearState } from "../../Redux/slices/CouponSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Coupons = () => {
  const notify = (arg) => toast(`${arg}`);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const { coupons, message, type, loading } = useSelector(
    (state) => state.coupons
  );

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
  const deleteCoupon = (code) => {
    axios
      .delete(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/coupons/?code=${code}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie()}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(loadAllCoupons({ cookie: getCookie() }));
        notify(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    const cookie = getCookie();
    console.log(keyword);
    dispatch(
      loadAllCoupons({
        keyword,
        cookie,
      })
    );
  };

  useEffect(() => {
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
      loadAllCoupons({
        cookie,
      })
    );
  }, [dispatch, type, message]);

  const columns = [
    {
      field: "name",
      headerName: "Coupon Name",
      minWidth: 180,
      flex: 0.3,
    },
    {
      field: "code",
      headerName: "Code",
      minWidth: 180,
      flex: 0.3,
    },
    {
      field: "expired",
      headerName: "Expired",
      minWidth: 180,
      flex: 0.3,
    },
    {
      field: "type",
      headerName: "Type",
      minWidth: 180,
      flex: 0.3,
    },
    {
      field: "dis_type",
      headerName: "Discount Type",
      minWidth: 180,
      flex: 0.3,
    },
    {
      field: "discount",
      headerName: "Discount",
      minWidth: 180,
      flex: 0.3,
    },
    {
      field: "exp_date",
      headerName: "Expiration Date",
      minWidth: 180,
      flex: 0.5,
      renderCell: (params) => {
        const time = new Date(params.row.exp_date)?.toLocaleDateString(
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
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/editcoupon/${params.id}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() => {
                if (
                  !window.confirm(
                    "Are you sure you want to delete this coupon?"
                  )
                )
                  return;
                deleteCoupon(params.row.code);
              }}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  coupons &&
    coupons.forEach((item, key) => {
      const newDate = new Date();
      const valid = newDate.toISOString() > item.expirationDate;
      rows.push({
        id: item._id,
        name: item.name,
        code: item.code,
        expired: valid ? "Expired" : "Valid",
        type: item.type,
        dis_type: item.discountType,
        discount: item.value,
        exp_date: new Date(item.expirationDate).getTime(),
      });
    });
  return (
    <div className=" flex flex-col overflow-y-scroll h-[89vh] w-[100%] lg:w-[80%] no-scroll  ">
      <div className="flex flex-col ml-5 ">
        <div className="  lg:flex lg:h-[80px] lg:items-center  ">
          <div className="mx-auto lg:mx-0  w-[80%] h-[45px] flex mt-5  overflow-hidden ">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search Category"
              className="w-[200px] flex-grow rounded-l-3xl border-[1px] border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 "
            />
            <div
              onClick={handleSearch}
              className="cursor-pointer w-[100px] flex justify-center items-center rounded-r-3xl border-[1px] border-gray-300  bg-[#4361ee] text-white"
            >
              Search
            </div>
          </div>
          <button className=" lg:mx-[5%] mx-[10%] mt-4 lg:mt-6 px-2 h-[45px] w-[80px] lg:w-[100px] cursor-pointer  flex justify-center items-center rounded-md border-[1px] border-gray-300  bg-[#4361ee] text-white">
            <Link to="/couponform">Add</Link>
          </button>
        </div>
        <p className="mx-[10%] lg:mx-[1%] my-3">
          Showing Results {coupons.length}
        </p>
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
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
      />
    </div>
  );
};

export default Coupons;
