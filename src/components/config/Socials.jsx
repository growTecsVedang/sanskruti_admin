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
    const doesUserWantToDelete = window.confirm(
      `Do you want to delete "${params.row.media}" social media link?`
    );

    if (!doesUserWantToDelete) return;
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

  const columns = [
    {
      field: "image",
      headerName: "Image",
      minWidth: 200,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Fragment>
            <img
              src={params.row.image}
              alt=""
              className="h-10 w-10 object-cover"
            />
          </Fragment>
        );
      },
    },
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
        image: item.link,
      });
    });

  return (
    <div className=" flex  flex-col overflow-y-scroll overflow-x-hidden  h-[89vh] w-[100%] lg:w-[80%] no-scroll  ">
      <div className="p-5">
        <Link to="/socialform">
          <button className="outline-none bg-slate-100 hover:bg-blue-400 font-semibold text-black px-6 py-2 rounded-md border-blue-400 border-[1px]">
            Add Social Media
          </button>
        </Link>
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
