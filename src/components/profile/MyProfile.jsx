import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "../Home/Sidebar";
import Navbar from "../Home/Navbar";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  logOutUser,
  userProfile,
  clearState,
} from "../../Redux/slices/UserSlice";
import { clearIsAuthenticate } from "../../Redux/slices/LoadUserSlice";
const MyProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, message, type, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const notify = (arg) => toast(`${arg}`);
    if (message && type) {
      if (type === "success") {
        notify(message);
        dispatch(clearState());
        history.push("/");
      } else {
        notify(message);
        dispatch(clearState());
      }
      dispatch(clearIsAuthenticate());
    }
  }, [dispatch, isAuthenticated, type, message, history]);
  useEffect(() => {
    const cookie = getCookie();
    dispatch(
      userProfile({
        cookie,
      })
    );
  }, []);

  function handleLogout() {
    const accessToken = getCookie();
    dispatch(
      logOutUser({
        cookie: accessToken,
      })
    );
  }

  function getCookie() {
    var name = "connect.sid".concat("=");
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

  return (
    <div className=" flex flex-col overflow-y-scroll no-scroll  h-[89vh] w-[100%] lg:w-[80%]">
      <div className="flex flex-col gap-x-3  lg:flex-row ">
        <div className=" w-[97%]   lg:min-w-[45%] mx-auto mt-5  min-h-[50px] bg-white  rounded-md flex flex-col     shadow-md ">
          <h1 className="text-xl h-[50px] flex  items-center pl-3 font-semibold ">
            User Details
          </h1>
          <div className="flex  min-h-[200px]  ">
            <div className=" w-[120px] sm:w-[200px]  h-full p-2 border-r-2   ">
              <img
                className="border-2 sm:mx-auto "
                src="https://res.cloudinary.com/dqyvomyqy/image/upload/v1683034362/user_2_mkh7hm.png"
                alt="userIcon"
              />
              <div className="flex flex-col">
                <h1 className="text-center mt-3 font-bold ">{user.username}</h1>
              </div>
            </div>
            <div className="flex flex-col w-[70%] ">
              <div className="flex mx-2 flex-grow flex-col">
                <label htmlFor="" className="font-semibold my-1 ">
                  Email
                </label>
                <input
                  value={user.email}
                  readOnly
                  className="h-[30px] w-full pl-3 my-1  rounded-md border text-black border-gray-300"
                />
              </div>
              <div className="flex mx-2 flex-grow flex-col">
                <label htmlFor="" className="font-semibold my-1 ">
                  Provider
                </label>
                <input
                  value={user.provider}
                  readOnly
                  className="h-[30px] w-full pl-3 my-1  rounded-md border text-black border-gray-300"
                />
              </div>
              <div className="flex mx-2 flex-grow flex-col">
                <label htmlFor="" className="font-semibold my-1 ">
                  Role
                </label>
                <input
                  value={user.role}
                  readOnly
                  className="h-[30px] w-full pl-3 my-1  rounded-md border text-black border-gray-300"
                />
              </div>
              {user.Mobile_No_verified ? (
                <div className="flex mx-2 flex-grow flex-col">
                  <label htmlFor="" className="font-semibold my-1 ">
                    Phone Verified
                  </label>
                  <input
                    value="Verified"
                    readOnly
                    className="h-[30px] w-full pl-3 my-1  rounded-md border text-green-600 border-gray-300"
                  />
                </div>
              ) : (
                <div className="flex mx-2 flex-grow flex-col">
                  <label htmlFor="" className="font-semibold my-1 ">
                    Phone Verified
                  </label>
                  <input
                    value="Not Verified"
                    readOnly
                    className="h-[30px] w-full pl-3 my-1  rounded-md border text-red-600 border-gray-300"
                  />
                </div>
              )}
              {user.email_verified ? (
                <div className="flex mx-2 flex-grow flex-col">
                  <label htmlFor="" className="font-semibold my-1 ">
                    Email Verified
                  </label>
                  <input
                    value="Verified"
                    readOnly
                    className=" text-green-600 h-[30px] w-full pl-3 my-1  rounded-md border border-gray-300"
                  />
                </div>
              ) : (
                <div className="flex mx-2 flex-grow flex-col">
                  <label htmlFor="" className="font-semibold my-1 ">
                    Email Verified
                  </label>
                  <input
                    value="Not Verified"
                    readOnly
                    className=" text-red-600 h-[30px] w-full pl-3 my-1  rounded-md border border-gray-300"
                  />
                </div>
              )}
              {user.is_Banned_User ? (
                <div className="flex mx-2 flex-grow flex-col">
                  <label htmlFor="" className="font-semibold my-1 ">
                    Banned
                  </label>
                  <input
                    value="Yes"
                    readOnly
                    className="h-[30px] w-full pl-3 my-1  rounded-md border text-red-600 border-gray-300"
                  />
                </div>
              ) : (
                <div className="flex mx-2 flex-grow flex-col">
                  <label htmlFor="" className="font-semibold my-1 ">
                    Banned
                  </label>
                  <input
                    value="No"
                    readOnly
                    className="h-[30px] w-full pl-3 my-1  rounded-md border text-green-600  border-gray-300"
                  />
                </div>
              )}
              <div className="flex mx-2 flex-grow flex-col">
                <label htmlFor="" className="font-semibold my-1 ">
                  D.O.B
                </label>
                <input
                  value={user.dob}
                  readOnly
                  className="h-[30px] w-full pl-3 my-1  rounded-md border text-black border-gray-300"
                />
              </div>
              <div className="flex mx-2 flex-grow flex-col">
                <label htmlFor="" className="font-semibold my-1 ">
                  Mobile.No
                </label>
                <input
                  value={user.Mobile_No}
                  readOnly
                  className="h-[30px] w-full pl-3 my-1  rounded-md border text-black border-gray-300"
                />
              </div>
              <div className="flex mx-2 flex-grow flex-col">
                <label htmlFor="" className="font-semibold my-1 ">
                  Address
                </label>
                <textarea
                  value="Near Wadala Bridge Wadala 400037 Mumbai"
                  readOnly
                  className="h-[100px] w-full pl-3 my-1  rounded-md border text-black border-gray-300"
                />
              </div>
              <div className="mx-2 my-2 ">
                <button
                  onClick={handleLogout}
                  className="text-xl   h-[45px] w-[120px] cursor-pointer  flex justify-center items-center rounded-md border-[1px] border-gray-300  bg-black text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
