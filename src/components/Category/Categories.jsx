import React, { Fragment, useEffect, useState } from "react";
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
  searchCategory,
  deleteCategory,
  loadAllCategories,
  clearState,
} from "../../Redux/slices/CategorySlice";
// import "./Category.css";

const Categories = () => {
  const { categories, message, type, categoryCount, loading } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const deleteCategoryHandler = (id) => {
    const accessToken = getCookie();
    dispatch(
      deleteCategory({
        id,
        cookie: accessToken,
      })
    );
  };
  const handleSearch = () => {
    if (keyword !== "") {
      dispatch(
        searchCategory({
          value: keyword,
        })
      );
    }
  };
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
      loadAllCategories({
        cookie,
      })
    );
  }, [dispatch, type, message]);

  const columns = [
    {
      field: "Image",
      headerName: "Image",
      minWidth: 200,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Fragment>
            <img
              src={params.row.Image}
              alt={params.row.Category}
              className="object-contain"
            />
          </Fragment>
        );
      },
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
      flex: 0.3,
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
            <Link to={`/editcategory/${params.id}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() => {
                const doesUserWantToDelete = window.confirm(
                  `Are you sure you want to DELETE category "${params.row.Category}"`
                );
                if (doesUserWantToDelete) deleteCategoryHandler(params.id);
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

  categories &&
    categories.forEach((item) => {
      rows.push({
        id: item._id,
        Category: item.Title,
        created_at: new Date(item.created_at).getTime(),
        Image: item.Image,
      });
    });

  return (
    <div className=" flex  flex-col overflow-y-scroll overflow-x-scroll  h-[89vh] w-[100%] lg:w-[80%] no-scroll  ">
      <div className="flex flex-col px-5">
        <div className="lg:flex gap-1 lg:h-[80px] lg:items-center  ">
          <div className="gap-2 h-[45px] w-full max-w-4xl flex mt-5 overflow-hidden ">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter Category Name"
              className="w-[200px] flex-grow bg-white rounded-md border-[1px] border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 "
            />
            <button
              onClick={handleSearch}
              className="cursor-pointer w-[100px] flex justify-center items-center rounded-md border-[1px] border-gray-300  bg-[#4361ee] text-white"
            >
              Search
            </button>
          </div>
          <button className=" lg:mx-[5%] mx-[10%] mt-4 lg:mt-6 px-2 h-[45px] w-[120px] lg:w-[150px] cursor-pointer  flex justify-center items-center rounded-md border-[1px] border-gray-300  bg-[#4361ee] text-white">
            <Link to="/categoryform">Add Category</Link>
          </button>
        </div>
      </div>

      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        className="productListTable"
        rowHeight={300}
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

export default Categories;
