import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../Home/Sidebar";
import Navbar from "../Home/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCategories } from "../../Redux/slices/CategorySlice";
// import "./Category.css";

const Categories = () => {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
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
    const cookie = getCookie();
    dispatch(
      loadAllCategories({
        cookie,
      })
    );
  }, [dispatch]);
  const columns = [
    { field: "id", headerName: "Category ID", minWidth: 200, flex: 0.5 },

    {
      field: "Category",
      headerName: "Category",
      minWidth: 180,
      flex: 0.3,
    },
    {
      field: "Sub_Category",
      headerName: "Sub Category",
      minWidth: 180,
      flex: 0.3,
    },
    {
      field: "Created_At",
      headerName: "Created At",
      minWidth: 180,
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

  categories &&
    categories.forEach((item, key) => {
      if (item._id.trim() !== "" && item.Title.trim() !== "") {
        rows.push({
          id: item._id,
          Category: item.Title,
          Sub_Category: item.SubCategory,
          Created_At: item.created_at,
        });
      }
    });

  return (
    <div>
      <Navbar />
      <div className=" flex w-[full] ">
        <Sidebar />
        <div className=" flex flex-col overflow-y-scroll no-scroll h-[100vh] w-[100%] lg:w-[80%]">
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
              <button className=" lg:mx-[5%] mx-[10%] mt-4 lg:mt-6 px-2 h-[45px] w-[120px] lg:w-[150px] cursor-pointer  flex justify-center items-center rounded-md border-[1px] border-gray-300  bg-[#4361ee] text-white">
                <Link to="/categoryform">Add Category</Link>
              </button>
            </div>
            <p className="mx-[10%] lg:mx-[1%] my-3">Showing Results 53</p>
          </div>
          <div className="w-full">
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
    </div>
  );
};

export default Categories;
