import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const GoogleAnalytics = () => {
  const [code, setCode] = useState("");
  const notify = (arg) => toast(`${arg}`);

  const _get = () => {
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/analytics/google`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setCode(res.data.code || "");
      })
      .catch();
  };

  const _submit = () => {
    if (!code.trim()) return notify("Please fill all fields");
    axios
      .post(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/analytics/google`,
        {
          code,
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
      "Do you want to delete Google analytics code?"
    );
    if (!doesUserWantToDelete) return;

    axios
      .delete(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/analytics/google`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setCode("");
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
    <main className="p-5 w-full max-w-xl min-h-screen h-full">
      <div className="bg-white p-5 rounded-lg flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Google Analytics</h3>
        <div className="flex mt-2 gap-1 border-[1px] border-gray-300 focus-within:border-gray-600 rounded-md pl-4 py-2">
          <label htmlFor="google">G-</label>
          <input
            type="text"
            id="google"
            className="border-none w-full outline-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="*****"
          />
        </div>

        <div className="flex ml-auto gap-2">
          <button
            onClick={_delete}
            className="px-4 outline-none py-2 border-[1px] border-gray-300 hover:border-red-300 rounded-md hover:bg-red-50"
          >
            Clear Code
          </button>
          <button
            onClick={_submit}
            className="px-4 outline-none py-2 border-[1px] border-gray-300 hover:border-sky-300 rounded-md hover:bg-sky-50"
          >
            Submit Code
          </button>
        </div>
      </div>
    </main>
  );
};

export default GoogleAnalytics;
