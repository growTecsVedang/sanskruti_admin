import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const WhatsappNumber = () => {
  const [number, setnumber] = useState("");
  const notify = (arg) => toast(`${arg}`);

  const _get = () => {
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/whatsappNumber`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setnumber(res.data.number || "");
      })
      .catch();
  };

  const _submit = () => {
    if (!number.trim()) return notify("Please fill all fields");
    if (number.trim().length != 10)
      return notify("mobile number should be 10 digit");
    axios
      .post(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/whatsappNumber`,
        {
          number: Number(number),
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
      })
      .catch((err) => {
        notify(err.response.data.message);
      });
  };

  const _delete = () => {
    const doesUserWantToDelete = window.confirm(
      "Do you want to delete Whatsapp number?"
    );
    if (!doesUserWantToDelete) return;

    axios
      .delete(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/whatsappNumber`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setnumber("");
        notify(res.data.message);
      })
      .catch((err) => {
        notify(err.response.data.message);
      });
  };

  useEffect(() => {
    _get();
  }, []);

  return (
    <main className="p-5 w-full max-w-xl  h-[89vh]">
      <div className="bg-white p-5 rounded-lg flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Whatsapp Number</h3>
        <div className="flex mt-2 gap-1 border-[1px] border-gray-300 focus-within:border-gray-600 rounded-md pl-4 py-2">
          <input
            type="number"
            id="whatsapp"
            className="border-none w-full outline-none"
            value={number}
            onChange={(e) => setnumber(e.target.value)}
            placeholder="1234567891"
          />
        </div>

        <div className="flex ml-auto gap-2">
          <button
            onClick={_delete}
            className="px-4 outline-none py-2 border-[1px] border-gray-300 hover:border-red-300 rounded-md hover:bg-red-50"
          >
            Clear number
          </button>
          <button
            onClick={_submit}
            className="px-4 outline-none py-2 border-[1px] border-gray-300 hover:border-sky-300 rounded-md hover:bg-sky-50"
          >
            Submit number
          </button>
        </div>
      </div>
    </main>
  );
};

export default WhatsappNumber;
