import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const notify = (arg) => toast(`${arg}`);

  // filters
  const [productNameFilter, setproductNameFilter] = useState("");
  const [pinnedFilter, setpinnedFilter] = useState("All");
  const [reviewStatusFilter, setreviewStatusFilter] = useState("All");
  const [reviewRating, setreviewRating] = useState("All");

  // Modal
  const [commentTitle, setcommentTitle] = useState("");
  const [commentContent, setcommentContent] = useState("");
  const [commentRating, setcommentRating] = useState(5);
  const [showModal, setshowModal] = useState(false);

  const _getReviews = async () => {
    const body = {
      page: 1,
    };
    if (pinnedFilter === "Pinned") body["notify"] = true;
    if (pinnedFilter === "Unpinned") body["notify"] = false;

    if (reviewStatusFilter !== "All") body["status"] = reviewStatusFilter;
    if (reviewRating !== "All") body["rating"] = reviewRating;

    if (productNameFilter && productNameFilter !== "")
      body["product_name"] = productNameFilter;
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/api/v1/admin/reviews`, body, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        setReviews(res.data.reviews);
      })
      .catch();
  };

  const changeStatus = async (status, id) => {
    axios
      .post(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/reviews/status`,
        {
          status,
          id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        notify(res.data.message);
        _getReviews();
      })
      .catch();
  };

  const changePinned = async (notifyValue, id) => {
    axios
      .post(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/reviews/notify`,
        {
          notify: notifyValue,
          id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        notify(res.data.message);
        _getReviews();
      })
      .catch();
  };

  const columns = [
    {
      field: "pinned",
      flex: 0.1,
      headerName: "Pinned",
      minWidth: 80,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <input
              type="checkbox"
              className="w-5 h-5 mx-auto"
              checked={params.row.pinned}
              onChange={(e) => changePinned(e.target.checked, params.row.id)}
            />
          </Fragment>
        );
      },
    },
    {
      field: "product_name",
      headerName: "Product Name",
      minWidth: 180,
      flex: 0.3,
    },
    {
      field: "product_image",
      headerName: "Product Image",
      minWidth: 180,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Fragment>
            <img
              src={params.row.product_image}
              alt={params.row.product_name}
              className="object-contain w-full h-full"
            />
          </Fragment>
        );
      },
    },
    {
      field: "rating",
      headerName: "Review rating",
      minWidth: 180,
      flex: 0.5,
      renderCell: (params) => {
        return params.row.rating + " / 5";
      },
    },
    {
      field: "comment",
      headerName: "Review comment",
      minWidth: 200,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div className="flex flex-col gap-2 w-full">
            <div className="text-lg font-semibold break-words">
              {params.row.title}
            </div>
            <button
              onClick={() => {
                setcommentContent(params.row.comment);
                setcommentTitle(params.row.title);
                setcommentRating(params.row.rating);
                setshowModal(true);
              }}
              className="px-3 py-1 rounded-md border-[1px] border-gray-300 bg-gray-100"
            >
              View Comment
            </button>
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 180,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Fragment>
            <select
              name="status"
              id="status"
              className="border-[1px] border-gray-300 bg-white px-3 py-2 rounded-md outline-none"
              defaultValue={params.row.status}
              onChange={(e) => changeStatus(e.target.value, params.row.id)}
            >
              <option value="Under review">Under Review</option>
              <option value="Accepted">Accepted</option>
              <option value="Denied">Denied</option>
            </select>
          </Fragment>
        );
      },
    },
  ];

  useEffect(() => {
    _getReviews();
  }, [pinnedFilter, reviewStatusFilter, reviewRating]);

  const rows = [];

  reviews.length &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        product_name: item.product_name,
        product_image: item.product_image,
        title: item.title,
        rating: item.rating,
        comment: item.comment,
        status: item.status,
        pinned: item.notify,
      });
    });

  return (
    <div className="relative flex flex-col overflow-y-scroll h-[89vh] w-[100%]  lg:w-[80%] no-scroll ">
      {/* Comment Modal */}
      {showModal && (
        <div className="fixed z-20 top-0 left-0 bg-black bg-opacity-30 w-full h-full flex items-center justify-center">
          <div className="flex p-5 gap-3 bg-white rounded-md w-full max-w-md max-h-[60vh] overflow-y-auto relative flex-col">
            <RxCross1
              className="absolute top-3 right-3 w-5 h-5 cursor-pointer"
              onClick={() => setshowModal(false)}
            />
            <h3 className="font-semibold text-xl">{commentTitle}</h3>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rate) =>
                rate <= commentRating ? (
                  <AiFillStar
                    key={rate}
                    className="h-5 w-5 cursor-pointer text-yellow-300"
                  />
                ) : (
                  <AiOutlineStar
                    key={rate}
                    className="h-5 w-5 cursor-pointer text-gray-400"
                  />
                )
              )}
            </div>
            <p>{commentContent}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col px-5 pb-5">
        <div className="lg:flex gap-1 lg:h-[80px] lg:items-center  ">
          <div className="gap-2 h-[45px] w-full max-w-4xl flex mt-5 overflow-hidden ">
            <input
              type="text"
              placeholder="Search Review based on product Name"
              value={productNameFilter}
              onChange={(e) => setproductNameFilter(e.target.value)}
              className="w-[200px] flex-grow bg-white rounded-md border-[1px] border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 "
            />
            <button
              onClick={_getReviews}
              className="cursor-pointer w-[100px] flex justify-center items-center rounded-md border-[1px] border-gray-300  bg-[#4361ee] text-white"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-5 flex-wrap px-5 mb-6">
        <div className="flex flex-col gap-1">
          <p>Pinned Status</p>
          <select
            name="pinned"
            id="pinned"
            defaultValue={pinnedFilter}
            onChange={(e) => setpinnedFilter(e.target.value)}
            className="border-[1px] border-gray-300 bg-white px-3 py-2 rounded-md outline-none"
          >
            <option value="All">All</option>
            <option value="Pinned">Pinned</option>
            <option value="Unpinned">Unpinned</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <p>Review Status</p>
          <select
            name="status"
            id="status"
            className="border-[1px] border-gray-300 bg-white px-3 py-2 rounded-md outline-none"
            defaultValue={reviewStatusFilter}
            onChange={(e) => setreviewStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Under review">Under Review</option>
            <option value="Accepted">Accepted</option>
            <option value="Denied">Denied</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <p>Review Rating</p>
          <select
            name="status"
            id="status"
            className="border-[1px] border-gray-300 bg-white px-3 py-2 rounded-md outline-none"
            defaultValue={reviewStatusFilter}
            onChange={(e) => setreviewRating(e.target.value)}
          >
            <option value="All">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        className="productListTable"
        rowHeight={120}
        loading={false}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 8 },
          },
        }}
      />
    </div>
  );
};

export default ReviewsPage;
