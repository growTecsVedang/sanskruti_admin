import React, { Fragment } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../Home/Sidebar";
import Navbar from "../Home/Navbar";

const Orders = () => {
  const columns = [
    { field: "id", headerName: "id", minWidth: 200, flex: 0.5 },

    {
      field: "Type",
      headerName: "Type",
      minWidth: 180,
      flex: 0.3,
    },

    {
      field: "Created At",
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
            <button>View</button>
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
        <div className=" flex  flex-col overflow-y-scroll overflow-x-hidden  h-[100vh] w-[100%] lg:w-[80%] no-scroll  ">
          <div className="flex flex-col ml-5 ">
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

export default Orders;
