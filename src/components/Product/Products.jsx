import React, { Fragment, useEffect } from "react";
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
  loadAllProducts,
  clearState,
  deleteProduct,
} from "../../Redux/slices/ProductSlice";
import { loadAllVarients } from "../../Redux/slices/VarientSlice";
import { loadAllCategories } from "../../Redux/slices/CategorySlice";
import { loadAllSubCategories } from "../../Redux/slices/SubCategorySlice";
const Products = () => {
  const { products, message, type, loading } = useSelector(
    (state) => state.products
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

  const handleDeleteProduct = (id) => {
    const cookie = getCookie();
    dispatch(
      deleteProduct({
        id,
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
      loadAllProducts({
        cookie,
      })
    );
    dispatch(
      loadAllVarients({
        cookie,
      })
    );
    dispatch(
      loadAllCategories({
        cookie,
      })
    );
    dispatch(
      loadAllSubCategories({
        cookie,
      })
    );
  }, [dispatch, type, message]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "Name",
      headerName: "Name",
      minWidth: 180,
      flex: 0.3,
    },
    {
      field: "Slug",
      headerName: "Slug",
      minWidth: 180,
      flex: 0.3,
    },
    {
      field: "Main_Category",
      headerName: "Main Category",
      minWidth: 180,
      flex: 0.5,
    },

    {
      field: "Sub_Category",
      headerName: "Sub Category",
      minWidth: 180,
      flex: 0.5,
    },
    {
      field: "Varients",
      headerName: "Varients",
      minWidth: 80,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.7,
      headerName: "Actions",
      minWidth: 180,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <button className="mx-5 w-[65px]  bg-[#caf0f8] p-2 rounded-md   ">
              <Link to="/viewuser">Reviews</Link>
            </button>
            <Link to={`/editproduct/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => handleDeleteProduct(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        Name: item.name,
        Slug: item.slug,
        Main_Category: item.MainCategory,
        Sub_Category: item.SubCategory,
        Varients: item.varients.variations.length,
      });
    });

  return (
    <div>
      <Navbar />
      <div className=" flex w-[full] ">
        <Sidebar />
        <div className=" flex flex-col overflow-y-scroll h-[100vh] w-[100%]  lg:w-[80%] no-scroll ">
          <div className="flex flex-col ml-5 ">
            <div className="  lg:flex lg:h-[80px] lg:items-center  ">
              <div className=" mx-auto lg:mx-0 w-[80%] h-[45px] flex mt-5  overflow-hidden ">
                <input
                  type="text"
                  placeholder="Search Products"
                  className="w-[200px] flex-grow rounded-l-3xl border-[1px] border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 "
                />
                <div className="cursor-pointer w-[100px] flex justify-center items-center rounded-r-3xl border-[1px] border-gray-300  bg-[#4361ee] text-white">
                  Search
                </div>
              </div>
              <Link to="/addproduct">
                <button className=" lg:mx-[5%] mx-[10%] mt-4 lg:mt-6  h-[45px] w-[120px] cursor-pointer  flex justify-center items-center rounded-md border-[1px] border-gray-300  bg-[#4361ee] text-white">
                  Add Product
                </button>
              </Link>
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

export default Products;
