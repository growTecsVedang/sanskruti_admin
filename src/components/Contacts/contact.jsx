import { Button } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import { useEffect } from "react";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const notify = (arg) => toast(`${arg}`);

  const [search, setSearch] = useState("");

  // Modal
  const [commentTitle, setcommentTitle] = useState("");
  const [commentContent, setcommentContent] = useState("");
  const [showModal, setshowModal] = useState(false);

  const _getContacts = async () => {
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/getAllContacts?search=${search}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setContacts(res.data.contacts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteContact = async (id) => {
    axios
      .delete(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/deleteContact/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        notify(res.data.message);
        _getContacts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const copyToClipboard = (text, name) => {
    navigator.clipboard.writeText(text);
    notify(`${name} copied`);
  };

  const columns = [
    {
      field: "name",
      headerName: "User name",
      minWidth: 180,
      flex: 0.3,
    },
    {
      field: "email",
      headerName: "User email",
      minWidth: 180,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <button
            onClick={() => copyToClipboard(params.row.email, "User email")}
            className="bg-transparent border-none outline-none hover:underline cursor-pointer"
            title="Copy email"
          >
            {params.row.email}
          </button>
        );
      },
    },
    {
      field: "tel",
      headerName: "User mobile number",
      minWidth: 180,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <button
            onClick={() =>
              copyToClipboard(params.row.tel, "User mobile number")
            }
            className="bg-transparent border-none outline-none hover:underline cursor-pointer"
            title="Copy mobile number"
          >
            {params.row.tel}
          </button>
        );
      },
    },
    {
      field: "review",
      headerName: "User review",
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
                setcommentContent(params.row.review);
                setcommentTitle(params.row.name);
                setshowModal(true);
              }}
              className="px-3 py-1 rounded-md border-[1px] border-gray-300 bg-gray-100"
            >
              View Review
            </button>
          </div>
        );
      },
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 180,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => {
                const checkIfUserWantsToDelete = window.confirm(
                  `Are you sure you want to permenently DELETE this contact`
                );

                if (!checkIfUserWantsToDelete) return;
                deleteContact(params.id);
              }}
            >
              <DeleteIcon />
            </button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    _getContacts();
  }, []);

  const rows = [];

  contacts.length &&
    contacts.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        tel: item.tel,
        review: item.review,
      });
    });

  return (
    <main className="relative flex flex-col overflow-y-scroll h-[89vh] w-[100%]  lg:w-[80%] no-scroll ">
      {/* Comment Modal */}
      {showModal && (
        <div className="fixed z-20 top-0 left-0 bg-black bg-opacity-30 w-full h-full flex items-center justify-center">
          <div className="flex p-5 gap-3 bg-white rounded-md w-full max-w-md max-h-[60vh] overflow-y-auto relative flex-col">
            <RxCross1
              className="absolute top-3 right-3 w-5 h-5 cursor-pointer"
              onClick={() => setshowModal(false)}
            />
            <h3 className="font-semibold text-xl">{commentTitle}</h3>

            <p>{commentContent}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col px-5 pb-5">
        <div className="lg:flex gap-1 lg:h-[80px] lg:items-center  ">
          <div className="gap-2 h-[45px] w-full max-w-4xl flex mt-5 overflow-hidden ">
            <input
              type="text"
              placeholder="Search Contacts based on user Name, Email or Mobile number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[200px] flex-grow bg-white rounded-md border-[1px] border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 "
            />
            <button
              onClick={_getContacts}
              className="cursor-pointer w-[100px] flex justify-center items-center rounded-md border-[1px] border-gray-300  bg-[#4361ee] text-white"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        className="productListTable"
        rowHeight={100}
        loading={false}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 8 },
          },
        }}
      />
    </main>
  );
};

export default ContactsPage;
