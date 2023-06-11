import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
// import { Button } from "@material-ui/core";
// import EditIcon from "@material-ui/icons/Edit";
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
import DeleteIcon from "@material-ui/icons/Delete";

const Users = () => {
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

  const deleteUserHandler = (id) => {
    const accessToken = getCookie();
    dispatch(
      deleteUser({
        id,
        cookie: accessToken,
      })
    );
  };

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
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <button className="mr-4 w-[50px] bg-sky-200 rounded-sm font-semibold hover:underline  ">
              <Link to={`/viewuser/${params.id}`}>View</Link>
            </button>
            <button onClick={() => deleteUserHandler(params.id)}>
              <DeleteIcon />
            </button>
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
