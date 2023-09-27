import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthKeys = () => {
  const notify = (arg) => toast(`${arg}`);

  const [googleClientId, setGoogleClientId] = useState("");
  const [googleClientSecret, setGoogleClientSecret] = useState("");
  const [facebookClientId, setFacebookClientId] = useState("");
  const [facebookClientSecret, setFacebookClientSecret] = useState("");

  const [tempGoogleClientId, setTempGoogleClientId] = useState("");
  const [tempGoogleClientSecret, setTempGoogleClientSecret] = useState("");
  const [tempFacebookClientId, setTempFacebookClientId] = useState("");
  const [tempFacebookClientSecret, setTempFacebookClientSecret] = useState("");

  const [status, setStatus] = useState({
    google: false,
    facebook: false,
  });

  const _get = () => {
    axios
      .get(`${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/auth`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        setStatus(res.data);
      });
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/auth/google`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setTempGoogleClientId(res.data.clientId);
        setTempGoogleClientSecret(res.data.secret);
      });
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/auth/facebook`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setTempFacebookClientId(res.data.clientId);
        setTempFacebookClientSecret(res.data.secret);
      });
  };
  useEffect(() => {
    _get();
  }, []);

  const setGoogle = () => {
    if (!googleClientId.trim() || !googleClientSecret.trim())
      return notify("Fill all details");
    axios
      .post(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/auth/google`,
        {
          clientId: googleClientId,
          secret: googleClientSecret,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setTempGoogleClientId(res.data.clientId);
        setTempGoogleClientSecret(res.data.secret);
        setGoogleClientId("");
        setGoogleClientSecret("");
        notify(res.data.message);
      })
      .catch((err) => {
        notify(err.response.data.message);
      });
  };
  const clearGoogle = () => {
    const doesUserWantToClear = window.confirm(
      "Do you want to clear google auth creadentials"
    );
    if (!doesUserWantToClear) return;
    axios
      .delete(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/auth/google`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setTempGoogleClientId(res.data.clientId);
        setTempGoogleClientSecret(res.data.secret);
        setGoogleClientId("");
        setGoogleClientSecret("");
        setStatus({
          google: res.data.google,
          facebook: res.data.facebook,
        });
        notify(res.data.message);
      })
      .catch((err) => {
        notify(err.response.data.message);
      });
  };
  const toggleGoogle = () => {
    status.google ? stopGoogle() : startGoogle();
  };
  const startGoogle = () => {
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/auth/google/start`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setStatus({
          google: res.data.google,
          facebook: res.data.facebook,
        });
        notify(res.data.message);
      })
      .catch((err) => {
        notify(err.response.data.message);
      });
  };
  const stopGoogle = () => {
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/auth/google/stop`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setStatus({
          google: res.data.google,
          facebook: res.data.facebook,
        });
        notify(res.data.message);
      })
      .catch((err) => {
        notify(err.response.data.message);
      });
  };

  const setFacebook = () => {
    if (!facebookClientId.trim() || !facebookClientSecret.trim())
      return notify("Fill all details");
    axios
      .post(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/auth/facebook`,
        {
          clientId: facebookClientId,
          secret: facebookClientSecret,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setTempFacebookClientId(res.data.clientId);
        setTempFacebookClientSecret(res.data.secret);
        setFacebookClientId("");
        setFacebookClientSecret("");
        notify(res.data.message);
      })
      .catch((err) => {
        notify(err.response.data.message);
      });
  };
  const clearFacebook = () => {
    const doesUserWantToClear = window.confirm(
      "Do you want to clear facebook auth creadentials"
    );
    if (!doesUserWantToClear) return;
    axios
      .delete(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/auth/facebook`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setTempFacebookClientId(res.data.clientId);
        setTempFacebookClientSecret(res.data.secret);
        setFacebookClientId("");
        setFacebookClientSecret("");
        setStatus({
          google: res.data.google,
          facebook: res.data.facebook,
        });
        notify(res.data.message);
      })
      .catch((err) => {
        notify(err.response.data.message);
      });
  };
  const toggleFacebook = () => {
    status.facebook ? stopFacebook() : startFacebook();
  };
  const startFacebook = () => {
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/auth/facebook/start`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setStatus({
          google: res.data.google,
          facebook: res.data.facebook,
        });
        notify(res.data.message);
      })
      .catch((err) => {
        notify(err.response.data.message);
      });
  };
  const stopFacebook = () => {
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/auth/facebook/stop`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setStatus({
          google: res.data.google,
          facebook: res.data.facebook,
        });
        notify(res.data.message);
      })
      .catch((err) => {
        notify(err.response.data.message);
      });
  };
  return (
    <div className="flex w-full flex-col gap-4 overflow-y-scroll h-[89vh]">
      <div className="bg-white p-5 rounded-lg flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Google Auth</h3>
        <div className="flex gap-1 items-center">
          <input
            type="checkbox"
            id="google"
            checked={status.google}
            className="hidden"
            onChange={toggleGoogle}
            readOnly
          />
          <label
            className={`border-[1px] ${
              status.google ? "border-green-400 bg-green-50" : "border-gray-300"
            } py-2 rounded-md cursor-pointer px-4`}
            htmlFor="google"
          >
            Google Auth is {status.google ? "Activated" : "Deactivated"}
          </label>
        </div>

        <div className="flex flex-col mt-5 gap-1">
          <label htmlFor="google_client_id">Client Id</label>
          <input
            type="text"
            id="google_client_id"
            value={googleClientId}
            placeholder={tempGoogleClientId}
            onChange={(e) => setGoogleClientId(e.target.value)}
            className="border-[1px] border-gray-300 focus-within:border-gray-600 rounded-md px-4 py-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="google_client_secret">Client Secret</label>
          <input
            type="text"
            id="google_client_secret"
            value={googleClientSecret}
            placeholder={tempGoogleClientSecret}
            onChange={(e) => setGoogleClientSecret(e.target.value)}
            className="border-[1px] border-gray-300 focus-within:border-gray-600 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex ml-auto gap-2">
          <button
            onClick={clearGoogle}
            className="px-4 outline-none py-2 border-[1px] border-gray-300 hover:border-red-300 rounded-md hover:bg-red-50"
          >
            Clear Credentials
          </button>
          <button
            onClick={setGoogle}
            className="px-4 outline-none py-2 border-[1px] border-gray-300 hover:border-sky-300 rounded-md hover:bg-sky-50"
          >
            Submit Credentials
          </button>
        </div>
      </div>
      <div className="bg-white p-5 rounded-lg flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Facebook Auth</h3>
        <div className="flex gap-1 items-center">
          <input
            type="checkbox"
            id="facebook"
            checked={status.facebook}
            className="hidden"
            onChange={toggleFacebook}
            readOnly
          />
          <label
            className={`border-[1px] ${
              status.facebook
                ? "border-green-400 bg-green-50"
                : "border-gray-300"
            } py-2 rounded-md cursor-pointer px-4`}
            htmlFor="facebook"
          >
            Facebook Auth is {status.facebook ? "Activated" : "Deactivated"}
          </label>
        </div>

        <div className="flex flex-col mt-5 gap-1">
          <label htmlFor="facebook_client_id">Client Id</label>
          <input
            type="text"
            id="facebook_client_id"
            value={facebookClientId}
            placeholder={tempFacebookClientId}
            onChange={(e) => setFacebookClientId(e.target.value)}
            className="border-[1px] border-gray-300 focus-within:border-gray-600 rounded-md px-4 py-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="facebook_client_secret">Client Secret</label>
          <input
            type="text"
            id="facebook_client_secret"
            value={facebookClientSecret}
            placeholder={tempFacebookClientSecret}
            onChange={(e) => setFacebookClientSecret(e.target.value)}
            className="border-[1px] border-gray-300 focus-within:border-gray-600 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex ml-auto gap-2">
          <button
            onClick={clearFacebook}
            className="px-4 outline-none py-2 border-[1px] border-gray-300 hover:border-red-300 rounded-md hover:bg-red-50"
          >
            Clear Credentials
          </button>
          <button
            onClick={setFacebook}
            className="px-4 outline-none py-2 border-[1px] border-gray-300 hover:border-sky-300 rounded-md hover:bg-sky-50"
          >
            Submit Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthKeys;
