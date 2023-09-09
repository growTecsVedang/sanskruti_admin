import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const PaymentMethodsIndex = () => {
  const [paymentStatus, setpaymentStatus] = useState({
    cashondelivery: false,
    payZapp: false,
  });
  const notify = (arg) => toast(`${arg}`);

  const [merchant_id, setMerchant_id] = useState("");
  const [working_key, setWorking_key] = useState("");
  const [access_code, setAccess_code] = useState("");

  const [tempmerchant_id, settempMerchant_id] = useState("");
  const [tempworking_key, settempWorking_key] = useState("");
  const [tempaccess_code, settempAccess_code] = useState("");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/user/config/paymentStatus`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setpaymentStatus(res.data);
      })
      .catch();
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/payZapp`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setMerchant_id(res.data.merchant_id || "");
        setWorking_key(res.data.working_key || "");
        setAccess_code(res.data.access_code || "");
      })
      .catch();
  }, []);

  const toggleCashonDelivery = async () => {
    axios
      .get(
        `${
          process.env.REACT_APP_ENDPOINT
        }/api/v1/superadmin/config/paymentStatus/cashondelivery/${
          paymentStatus?.cashondelivery ? "stop" : "start"
        }`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setpaymentStatus({
          cashondelivery: res.data.cashondelivery,
          payZapp: res.data.payZapp,
        });
        notify(res.data.message);
      });
  };

  const togglePayZapp = async () => {
    axios
      .get(
        `${
          process.env.REACT_APP_ENDPOINT
        }/api/v1/superadmin/config/paymentStatus/payZapp/${
          paymentStatus?.payZapp ? "stop" : "start"
        }`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setpaymentStatus({
          cashondelivery: res.data.cashondelivery,
          payZapp: res.data.payZapp,
        });
        notify(res.data.message);
      })
      .catch((err) => {
        notify(err.response.data.message);
      });
  };

  const submitCredentials = async () => {
    axios
      .post(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/payZapp`,
        {
          merchant_id: !tempmerchant_id ? undefined : tempmerchant_id,
          working_key: !tempworking_key ? undefined : tempworking_key,
          access_code: !tempaccess_code ? undefined : tempaccess_code,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        settempWorking_key("");
        settempMerchant_id("");
        settempAccess_code("");
        setMerchant_id(res.data.merchant_id);
        setWorking_key(res.data.working_key);
        setAccess_code(res.data.access_code);
      });
  };

  const clearCredentials = () => {
    const doesUserWantToClearCredentials = window.confirm(
      "Are you sure you want to clear your credentials. This action will deactivate payZapp and clear all credentials"
    );
    if (!doesUserWantToClearCredentials) return;

    axios
      .delete(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/payZapp`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        settempWorking_key("");
        settempMerchant_id("");
        settempAccess_code("");
        setMerchant_id(res.data.merchant_id);
        setWorking_key(res.data.working_key);
        setAccess_code(res.data.access_code);
        setpaymentStatus({
          cashondelivery: res.data.cashondelivery,
          payZapp: res.data.payZapp,
        });
      });
  };

  return (
    <main className="p-5 w-full">
      <div className="flex w-full flex-col gap-4">
        <div className="bg-white p-5 rounded-lg flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Cash on Delivery</h3>
          <div className="flex gap-1 items-center">
            <input
              type="checkbox"
              id="cod"
              checked={paymentStatus?.cashondelivery}
              className="hidden"
              onChange={toggleCashonDelivery}
              readOnly
            />
            <label
              className={`border-[1px] ${
                paymentStatus?.cashondelivery
                  ? "border-green-400 bg-green-50"
                  : "border-gray-300"
              } py-2 rounded-md cursor-pointer px-4`}
              htmlFor="cod"
            >
              Cash on delivery is{" "}
              {paymentStatus?.cashondelivery ? "Activated" : "Deactivated"}
            </label>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg flex flex-col gap-3">
          <h3 className="text-lg font-semibold">PayZapp</h3>
          <div className="flex gap-1 items-center">
            <input
              type="checkbox"
              id="payzapp"
              checked={paymentStatus?.payZapp}
              className="hidden"
              onChange={togglePayZapp}
              readOnly
            />
            <label
              className={`border-[1px] ${
                paymentStatus?.payZapp
                  ? "border-green-400 bg-green-50"
                  : "border-gray-300"
              } py-2 rounded-md cursor-pointer px-4`}
              htmlFor="payzapp"
            >
              Cash on delivery is{" "}
              {paymentStatus?.payZapp ? "Activated" : "Deactivated"}
            </label>
          </div>

          <div className="flex flex-col mt-5 gap-1">
            <label htmlFor="merchant_id">Merchant Id</label>
            <input
              type="text"
              id="merchant_id"
              value={tempmerchant_id}
              placeholder={merchant_id}
              onChange={(e) => settempMerchant_id(e.target.value)}
              className="border-[1px] border-gray-300 focus-within:border-gray-600 rounded-md px-4 py-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="working_key">Working Key</label>
            <input
              type="text"
              id="working_key"
              value={tempworking_key}
              placeholder={working_key}
              onChange={(e) => settempWorking_key(e.target.value)}
              className="border-[1px] border-gray-300 focus-within:border-gray-600 rounded-md px-4 py-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="access_code">Access Code</label>
            <input
              type="text"
              id="access_code"
              value={tempaccess_code}
              placeholder={access_code}
              onChange={(e) => settempAccess_code(e.target.value)}
              className="border-[1px] border-gray-300 focus-within:border-gray-600 rounded-md px-4 py-2"
            />
          </div>

          <div className="flex ml-auto gap-2">
            <button
              onClick={clearCredentials}
              className="px-4 outline-none py-2 border-[1px] border-gray-300 hover:border-red-300 rounded-md hover:bg-red-50"
            >
              Clear Credentials
            </button>
            <button
              onClick={submitCredentials}
              className="px-4 outline-none py-2 border-[1px] border-gray-300 hover:border-sky-300 rounded-md hover:bg-sky-50"
            >
              Submit Credentials
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentMethodsIndex;
