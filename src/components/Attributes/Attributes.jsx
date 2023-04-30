import React, { Fragment } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../Home/Sidebar";
import Navbar from "../Home/Navbar";
import { Link } from "react-router-dom";

const Attributes = () => {
  const columns = [
    { field: "id", headerName: "Title", minWidth: 200, flex: 0.5 },

    {
      field: "Values",
      headerName: "Values",
      minWidth: 180,
      flex: 0.3,
    },

    {
      field: "Created",
      headerName: "Created",
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
            <EditIcon />
            <Button>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  return (
    <div>
      <Navbar />
      <div className=" flex w-[full] ">
        <Sidebar />
        <div className=" flex flex-col overflow-y-scroll h-[100vh] w-[100%] lg:w-[80%] no-scroll  ">
          <div className="flex flex-col ml-5 ">
            <div className="  lg:flex lg:h-[80px] lg:items-center  ">
              <div className="mx-auto lg:mx-0  w-[80%] h-[45px] flex mt-5  overflow-hidden ">
                <input
                  type="text"
                  placeholder="Search Category"
                  className="w-[200px] flex-grow rounded-l-3xl border-[1px] border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 "
                />
                <div className="cursor-pointer w-[100px] flex justify-center items-center rounded-r-3xl border-[1px] border-gray-300  bg-[#4361ee] text-white">
                  Search
                </div>
              </div>
              <Link to="/attributeform">
                <button className=" lg:mx-[5%] mx-[10%] mt-4 lg:mt-6 px-2 h-[45px] w-[80px] lg:w-[100px] cursor-pointer  flex justify-center items-center rounded-md border-[1px] border-gray-300  bg-[#4361ee] text-white">
                  Add
                </button>
              </Link>
            </div>
            <p className="mx-[10%] lg:mx-[1%] my-3">Showing Results 53</p>
          </div>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </div>
  );
};

export default Attributes;
