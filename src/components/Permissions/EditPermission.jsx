import React, { useEffect, useState } from "react";
import Sidebar from "../Home/Sidebar";
import Navbar from "../Home/Navbar";
import decodeRole from "../../helper/decodeRole";
import {
  clearState,
  getUserDetails,
  updateUser,
} from "../../Redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditPermission = (props) => {
  const [Role, setRole] = useState("");
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();
  const { user, message, type } = useSelector((state) => state.user);
  useEffect(() => {
    const cookie = getCookie();
    const id = props.match.params.id;
    dispatch(
      getUserDetails({
        cookie,
        id,
      })
    );
  }, []);

  useEffect(() => {
    setRole(user.role);
    setChecked(user.is_Banned_User);
  }, [user]);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (Role !== "") {
      const cookie = getCookie();
      dispatch(
        updateUser({
          id: props.match.params.id,
          cookie,
          body: {
            role: decodeRole(Role),
            is_Banned_User: checked,
          },
        })
      );
    }
  };

  const handleInputChange = (e) => {
    //const name = e.target.name
    //const value = e.target.value
    const { value } = e.target;

    if (value === "false") {
      setChecked(true);
    } else {
      setChecked(false);
    }
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
  }, [dispatch, type, message]);

  return (
    <div className="">
      <Navbar />
      <div className=" flex w-[full] bg-[#edf2f4] opacity-80 ">
        <Sidebar />
        <div className=" flex flex-col overflow-y-scroll no-scroll  h-[100vh] w-[100%] lg:w-[80%]">
          <div className="flex flex-col gap-x-3  lg:flex-row ">
            <div className=" w-[97%]   lg:min-w-[45%] mx-auto mt-5  min-h-[50px] bg-white  rounded-md flex flex-col     shadow-md ">
              <h1 className="text-xl h-[50px] flex  items-center pl-3 font-semibold ">
                User Details
              </h1>
              <div className="flex  min-h-[200px]  ">
                <div className=" w-[120px]  sm:w-[200px]  h-full p-2 border-r-2   ">
                  <img
                    className="border-2"
                    src="https://res.cloudinary.com/dqyvomyqy/image/upload/v1683034362/user_2_mkh7hm.png"
                    alt="userIcon"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-center mt-3 font-bold ">
                      {user.username}
                    </h1>
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
                      Address
                    </label>
                    <textarea
                      value="Near Wadala Bridge Wadala 400037 Mumbai"
                      readOnly
                      className="h-[100px] w-full pl-3 my-1  rounded-md border text-black border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-[97%]  lg:flex-grow mx-auto mt-5  min-h-[50px] bg-white  rounded-md flex flex-col     shadow-md ">
              <h1 className="text-xl mb-4  h-[50px] flex  items-center pl-3 font-semibold ">
                Update User Role
              </h1>
              <div className="">
                <form onSubmit={handleFormSubmit}>
                  <div className="w-[95%] mx-auto  flex  ">
                    <h1 className="flex items-center text-2xl  mr-4 ">Role</h1>
                    <select
                      onChange={(e) => setRole(e.target.value)}
                      value={Role}
                      className="cursor-pointer h-[45px] min-w-[140px] pl-3  bg-gray-50 rounded-md text-lg border-2 border-gray-300 "
                    >
                      <option value="">Roles</option>
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="SUPERADMIN">SUPERADMIN</option>
                    </select>
                  </div>
                  <div className="w-[95%] mx-auto h-[80px] sm:h-[40px] lg:h-[40px] px-5 mt-3 rounded-md flex items-center bg-[#bde0fe]  ">
                    To ban user make the checkbox checked and to unban user
                    unchecked it.
                  </div>
                  <div className=" w-[95%] mx-auto  flex h-[50px] items-center my-5 ">
                    <label
                      htmlFor=""
                      className="mb-1  mr-3 text-2xl   lg:flex lg:h-[50px] lg:items-center"
                    >
                      Ban User
                    </label>
                    <input
                      type="checkbox"
                      value={checked}
                      checked={checked}
                      onChange={handleInputChange}
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  </div>
                  <div className="w-full flex justify-end ">
                    <button
                      type="submit"
                      className="  mr-3 mb-2  mt-4 lg:mt-6 px-2 h-[45px] w-[80px] lg:w-[100px] cursor-pointer  flex justify-center items-center rounded-md border-[1px] border-gray-300  bg-[#4361ee] text-white"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPermission;
