import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../Home/Sidebar";
import Navbar from "../Home/Navbar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteVarient,
  loadAllVarients,
  clearState,
} from "../../Redux/slices/VarientSlice";
import { useSelector, useDispatch } from "react-redux";

const Attributes = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const { varients, message, type } = useSelector((state) => state.varients);

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
  const deleteVarientHandler = (id) => {
    dispatch(
      deleteVarient({
        id,
      })
    );
  };
  const handleSearch = () => {
    const cookie = getCookie();
    console.log(keyword);
    dispatch(
      loadAllVarients({
        keyword,
        cookie,
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
      loadAllVarients({
        cookie,
      })
    );
  }, [dispatch, type, message]);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Varient Name",
      minWidth: 180,
      flex: 0.3,
    },
    {
      field: "value",
      headerName: "Attributes Count",
      minWidth: 180,
      flex: 0.3,
    },

    {
      field: "Created_At",
      headerName: "Created At",
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
            <Link to={`/editattribute/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteVarientHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  varients &&
    varients.forEach((item, key) => {
      rows.push({
        id: item._id,
        name: item.varientName,
        value: item.value.length,
        Created_At: item.created_at,
      });
    });
  return (
    <div className=" flex flex-col overflow-y-scroll h-[90vh] w-[100%] lg:w-[80%] no-scroll  ">
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
            <Link to="/attributeform">Add</Link>
          </button>
        </div>
        <p className="mx-[10%] lg:mx-[1%] my-3">
          Showing Results {varients.length}
        </p>
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
  );
};

export default Attributes;
