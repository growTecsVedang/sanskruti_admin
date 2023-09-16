import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import Sidebar from "../Home/Sidebar";
import Navbar from "../Home/Navbar";
import { toast } from "react-toastify";
import {
  loadAllSocials,
  clearState,
  deleteSocials,
} from "../../Redux/slices/Config";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";

const Socials = () => {
  const { socials, message, type } = useSelector((state) => state.config);
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

  const handleDeleteProduct = (params) => {
    const cookie = getCookie();
    dispatch(
      deleteSocials({
        id: params.row.id,
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
      loadAllSocials({
        cookie,
      })
    );
  }, [dispatch, type, message]);
  console.log(socials);

  const columns = [
    { field: "id", headerName: "id", minWidth: 200, flex: 0.5 },
    {
      field: "media",
      headerName: "Media",
      minWidth: 180,
      flex: 0.5,
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
            <Link to={`/viewsocial/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => handleDeleteProduct(params)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];

  socials &&
    socials.forEach((item) => {
      rows.push({
        id: item.id,
        media: item.media,
      });
    });

  return (
    <div className=" flex  flex-col overflow-y-scroll overflow-x-hidden  h-[89vh] w-[100%] lg:w-[80%] no-scroll  ">
      <div className=" ml-2 lg:ml-0 flex flex-col sm:flex-row lg:justify-end mt-3 lg:items-center gap-x-8  mr-2 min-h-[60px] ">
        <button className=" lg:mx-[5%] mx-[10%] my-4 lg:mt-6 px-2 h-[45px] w-[150px] lg:w-[150px] cursor-pointer  flex justify-center items-center rounded-md border-[1px] border-gray-300  bg-[#4361ee] text-white">
          <Link to="/socialform">Add Social Media</Link>
        </button>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        className="productListTable"
        rowHeight={60}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 8, page: 0 },
          },
        }}
      />
    </div>
  );
};

export default Socials;
