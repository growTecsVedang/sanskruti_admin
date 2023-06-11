import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@material-ui/icons/Edit";
import Sidebar from "../Home/Sidebar";
import Navbar from "../Home/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllUsers,
  clearState,
  deleteUser,
} from "../../Redux/slices/UserSlice";
import { toast } from "react-toastify";
import getRole from "../../helper/getRole";

const Users = () => {
  const [Role, setRole] = useState("");
  const dispatch = useDispatch();
  const { users, message, type } = useSelector((state) => state.user);

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
      loadAllUsers({
        cookie,
      })
    );
  }, [dispatch, type, message]);

  const columns = [
    { field: "id", headerName: "id", minWidth: 200, flex: 0.5 },

    {
      field: "Username",
      headerName: "Username",
      minWidth: 180,
      flex: 0.3,
    },

    {
      field: "Email",
      headerName: "Email",
      minWidth: 180,
      flex: 0.3,
    },

    {
      field: "Provider",
      headerName: "Provider",
      minWidth: 180,
      flex: 0.5,
    },
    {
      field: "Mobile_No",
      headerName: "Mobile_No",
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: "Role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "BANNED_USER",
      headerName: "Banned",
      minWidth: 150,
      flex: 0.3,
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
            <Link to={`/editpermission/${params.id}`}>
              <EditIcon />
            </Link>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        Username: item.username,
        Email: item.email,
        Provider: item.provider,
        Mobile_No: item.Mobile_No,
        Role: getRole(item.role),
        BANNED_USER: item.is_Banned_User ? "YES" : "NO",
      });
    });
  return (
    <div>
      <Navbar />
      <div className=" flex w-[full] ">
        <Sidebar />
        <div className=" flex  flex-col overflow-y-scroll overflow-x-hidden  h-[100vh] w-[100%] lg:w-[80%] no-scroll  ">
          <div className="flex flex-col ml-5 ">
            <div className="  lg:flex lg:h-[80px] lg:items-center  ">
              <div className="mx-auto lg:mx-0  w-[80%] h-[45px] flex mt-5  overflow-hidden ">
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="w-[200px] flex-grow rounded-l-3xl border-[1px] border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 "
                />
                <div className="cursor-pointer w-[100px] flex justify-center items-center rounded-r-3xl border-[1px] border-gray-300  bg-[#4361ee] text-white">
                  Search
                </div>
              </div>
            </div>
            <p className="mx-[10%] lg:mx-[1%] my-3">Showing Results 53</p>
          </div>

          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            className="productListTable"
            rowHeight={60}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
