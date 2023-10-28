import React, { Fragment, useEffect, useState } from "react";
import { DataGrid, GridRowSpacingParams } from "@mui/x-data-grid";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../Home/Sidebar";
import Navbar from "../Home/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllBanners,
  deleteBanner,
  clearState,
} from "../../Redux/slices/BannerSlice";
import EditIcon from "@material-ui/icons/Edit";
import { toast } from "react-toastify";

const Banner = () => {
  const { banners, message, type, loading } = useSelector(
    (state) => state.banners
  );
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const deleteBannerHandler = (id) => {
    const accessToken = getCookie();
    dispatch(
      deleteBanner({
        id,
        cookie: accessToken,
      })
    );
  };
  const handleSearch = () => {
    const cookie = getCookie();
    console.log(keyword);
    dispatch(
      loadAllBanners({
        keyword,
        cookie,
      })
    );
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
    const cookie = getCookie();
    dispatch(
      loadAllBanners({
        cookie,
      })
    );
  }, []);

  const columns = [
    {
      field: "image",
      headerName: "Desktop Image",
      minWidth: 380,
      flex: 0.7,
      headerClassName: "center-align",
      renderCell: (params) => {
        const imageUrl = params.row.desktopImage;
        console.log(params);

        return (
          <img
            src={imageUrl}
            alt="Avatar"
            style={{
              width: "100%",
              height: "auto",
              padding: "8px",
              margin: "10px",
            }}
          />
        );
      },
    },
    {
      field: "mobileimage",
      headerName: "Mobile Image",
      minWidth: 100,
      flex: 0.7,
      renderCell: (params) => {
        const imageUrl = params.row.mobileImage;
        console.log(params);

        return (
          <img
            src={imageUrl}
            alt="Avatar"
            className="object-contain w-full h-full"
          />
        );
      },
    },

    {
      field: "isPublished",
      headerName: "Published",
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
            <Link to={`/editbanner/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteBannerHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  // Adjust the row gap value as desired

  banners &&
    banners.forEach((item) => {
      rows.push({
        id: item._id,
        isPublished: item.isPublished === true ? "YES" : "NO",
        desktopImage: item.desktopImage,
        mobileImage: item.mobileImage,
      });
    });

  return (
    <div className=" flex  flex-col overflow-y-scroll overflow-x-hidden  h-[89vh] w-[100%] lg:w-[80%] no-scroll  ">
      <div className="flex flex-col ml-5 ">
        <div className="  lg:flex lg:h-[80px] lg:items-center  ">
          <div className="mx-auto lg:mx-0  w-[80%] h-[45px] flex mt-5  overflow-hidden ">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter Type Ex.Mobile,Laptop,Tablet"
              className="w-[200px] flex-grow rounded-l-3xl border-[1px] border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 "
            />
            <div
              onClick={handleSearch}
              className="cursor-pointer w-[100px] flex justify-center items-center rounded-r-3xl border-[1px] border-gray-300  bg-[#4361ee] text-white"
            >
              Search
            </div>
          </div>
          <Link
            to="/bannerform"
            className="lg:mx-[5%] mx-[10%] mt-4 lg:mt-6 px-2 h-[45px] w-[80px] lg:w-[100px] cursor-pointer  flex justify-center items-center rounded-md border-[1px] border-gray-300  bg-[#4361ee] text-white"
          >
            Add
          </Link>
        </div>
      </div>

      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        className="productListTable"
        rowSpacingType=""
        rowHeight={180}
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

export default Banner;
