import React, { useEffect, Fragment, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../Home/Sidebar";
import Navbar from "../Home/Navbar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllSubCategories,
  deleteSubCategory,
  clearState,
} from "../../Redux/slices/SubCategorySlice";

const SubCategories = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const { subCategories, message, type, subCategoriesCount, loading } =
    useSelector((state) => state.subcategories);
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

  const deleteSubCategoryHandler = (id) => {
    const accessToken = getCookie();
    dispatch(
      deleteSubCategory({
        id,
        cookie: accessToken,
      })
    );
  };
  const handleSearch = () => {
    const cookie = getCookie();
    console.log(keyword);
    dispatch(
      loadAllSubCategories({
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
      loadAllSubCategories({
        cookie,
      })
    );
  }, [dispatch, type, message]);

  const columns = [
    {
      field: "Title",
      headerName: "Sub Category",
      minWidth: 180,
      type: "string",
      flex: 0.3,
    },
    {
      field: "Category",
      headerName: "Category",
      minWidth: 180,
      type: "string",
      flex: 0.3,
    },
    {
      field: "created_at",
      headerName: "Created At",
      minWidth: 180,
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
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/editsubcategory/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteSubCategoryHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];

  subCategories &&
    subCategories.forEach((item, key) => {
      if (item._id.trim() !== "" && item.Title.trim() !== "") {
        rows.push({
          id: item._id,
          Title: item.Title,
          Category: item.Category,
          created_at: new Date(item.created_at),
        });
      }
    });

  return (
    <div className=" flex flex-col overflow-y-scroll no-scroll h-[89vh] w-[100%] lg:w-[80%]">
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
          <button className=" lg:mx-[5%] mx-[10%] mt-4 lg:mt-6 px-2 h-[45px] w-[160px] lg:w-[150px] cursor-pointer  flex justify-center items-center rounded-md border-[1px] border-gray-300  bg-[#4361ee] text-white">
            <Link to="/subcategoryform">Add SubCategory</Link>
          </button>
        </div>
        <p className="mx-[10%] lg:mx-[1%] my-3">
          Showing Results {subCategories.length}
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
            paginationModel: { pageSize: 8, page: 0 },
          },
        }}
      />
    </div>
  );
};

export default SubCategories;
