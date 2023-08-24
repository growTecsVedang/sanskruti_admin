import React, { useState } from "react";
import { BiUserCircle, BiCalendarStar } from "react-icons/bi";
import { CiDiscount1 } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  AiOutlineClose,
  AiOutlineInbox,
  AiOutlineSetting,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { BsShieldLockFill } from "react-icons/bs";
import { ImImages, ImProfile } from "react-icons/im";
import { logOutUser } from "../../Redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {
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
  const [open, setOpen] = useState(false);
  const [prod, setProd] = useState(false);
  const [settings, setSettings] = useState(false);

  return (
    <div className="">
      <nav className="relative px-8 py-4 flex justify-between items-center border-y border-gray-400 ">
        <p className="text-3xl font-bold leading-none flex items-center space-x-4">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#4F46E5"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                clipRule="evenodd"
              />
              <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
            </svg>
          </span>
          <span className="text-gray-600  text-xl">Sanskrutinx</span>
        </p>
        <div className="flex gap-5">
          <div className="">
            <div className="flex items-center space-x-2">
              <span className="flex flex-col">
                <div className="cursor-pointer">
                  <BiUserCircle size={30} />
                </div>
              </span>
            </div>
          </div>
          <div className="lg:hidden cursor-pointer">
            {open ? (
              <div onClick={() => setOpen(!open)}>
                {<AiOutlineClose size={30} />}
              </div>
            ) : (
              <div onClick={() => setOpen(!open)}>
                {<RxHamburgerMenu size={30} />}
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* mobile  */}
      <div
        className={
          open
            ? " lg:hidden h-[90vh] w-[220px] absolute overflow-y-scroll  ease-in-out duration-500  bg-[#fbfbfb] z-20 left-[0px] "
            : " lg:hidden fixed left-[-100%]"
        }
      >
        <Link to="/home">
          <div
            className="h-[40px] flex mt-3  w-[100%] pl-5 text-xl"
            onClick={() => setOpen(false)}
          >
            <MdOutlineDashboard size={30} />
            <div className="mx-5">Dashboard</div>
          </div>
        </Link>
        <hr className="text-black h-2" />
        <div
          onClick={() => setProd(!prod)}
          className=" cursor-pointer h-[40px] flex mt-3  w-[100%] pl-5 text-xl"
        >
          <AiOutlineInbox size={30} />
          <div className="mx-5">Product</div>
          {prod ? (
            <RiArrowDropUpLine size={30} />
          ) : (
            <RiArrowDropDownLine size={30} />
          )}
        </div>
        {prod ? (
          <div className="bg-[#ebf7f7]">
            <Link to="/categories">
              <div
                className="h-[40px] flex mt-3 items-center  w-[100%] pl-5 text-xl"
                onClick={() => {
                  setProd(!prod);
                  setOpen(false);
                }}
              >
                <div className="mx-5">Categories</div>
              </div>
            </Link>
            <Link to="/subcategories">
              <div
                className="h-[40px] flex mt-3 items-center w-[100%] pl-5 text-xl"
                onClick={() => {
                  setProd(!prod);
                  setOpen(false);
                }}
              >
                <div className="mx-5">SubCategories</div>
              </div>
            </Link>
            <Link to="/attributes">
              <div
                className="h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-xl"
                onClick={() => {
                  setProd(!prod);
                  setOpen(false);
                }}
              >
                <div className="mx-5">Attributes</div>
              </div>
            </Link>
            <Link to="/products">
              <div
                className="h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-xl"
                onClick={() => {
                  setProd(!prod);
                  setOpen(false);
                }}
              >
                <div className="mx-5">Products</div>
              </div>
            </Link>
          </div>
        ) : (
          ""
        )}
        <hr className="text-black h-2" />
        <Link to="/banner">
          <div
            className="h-[40px] flex mt-3  w-[200px] pl-5 text-xl"
            onClick={() => setOpen(false)}
          >
            <ImImages size={30} />
            <div className="mx-5">Banner</div>
          </div>
        </Link>
        <hr className="text-black h-2" />
        <Link to="/subbanner">
          <div
            className="h-[40px] flex mt-3  w-[200px] pl-5 text-xl"
            onClick={() => setOpen(false)}
          >
            <ImImages size={30} />
            <div className="mx-5">Sub Banner</div>
          </div>
        </Link>
        <hr className="text-black h-2" />
        <Link to="/orders">
          <div
            className="h-[40px] flex mt-3  w-[200px] pl-5 text-xl"
            onClick={() => setOpen(false)}
          >
            <MdOutlineDashboard size={30} />
            <div className="mx-5">Orders</div>
          </div>
        </Link>
        <hr className="text-black h-2" />
        <Link to="/coupons">
          <div
            className="h-[40px] flex mt-3  w-[200px] pl-5 text-xl"
            onClick={() => setOpen(false)}
          >
            <CiDiscount1 size={30} />
            <div className="mx-5">Coupons</div>
          </div>
        </Link>
        <hr className="text-black h-2" />
        <Link to="/users">
          <div
            className="h-[40px] flex my-3  w-[200px] pl-5 text-xl"
            onClick={() => setOpen(false)}
          >
            <FiUsers size={30} />
            <div className="mx-5">Users</div>
          </div>
        </Link>

        <hr className="text-black h-2" />
        <Link to="/permissions">
          <div
            className="h-[40px] flex mt-3  w-[200px] pl-5 text-xl"
            onClick={() => setOpen(false)}
          >
            <BsShieldLockFill size={30} />
            <div className="mx-5">Permissions</div>
          </div>
        </Link>
        <hr className="text-black h-2" />
        <Link to="/profile">
          <div
            className="h-[40px] flex mt-3  w-[200px] pl-5 text-xl"
            onClick={() => setOpen(false)}
          >
            <ImProfile size={30} />
            <div className="mx-5">Profile</div>
          </div>
        </Link>
        <hr className="text-black h-2" />
        <div
          onClick={() => setSettings(!settings)}
          className=" cursor-pointer h-[40px] flex mt-3  w-[100%] pl-5 text-xl"
        >
          <AiOutlineSetting size={30} />
          <div className="mx-5">Settings</div>
          {settings ? (
            <RiArrowDropUpLine size={30} />
          ) : (
            <RiArrowDropDownLine size={30} />
          )}
        </div>
        {settings ? (
          <div className="bg-[#ebf7f7]">
            <Link to="/return">
              <div
                className="h-[40px] flex mt-3 items-center  w-[100%] pl-5 text-xl"
                onClick={() => setOpen(false)}
              >
                <div className="mx-5">Return</div>
              </div>
            </Link>
            <Link to="/t&c">
              <div
                className="h-[40px] flex mt-3 items-center w-[100%] pl-5 text-xl"
                onClick={() => setOpen(false)}
              >
                <div className="mx-5">T&C</div>
              </div>
            </Link>
            <Link to="/policy">
              <div
                className="h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-xl"
                onClick={() => setOpen(false)}
              >
                <div className="mx-5">Privacy Policy</div>
              </div>
            </Link>
            <Link to="/analytics">
              <div
                className="h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-xl"
                onClick={() => setOpen(false)}
              >
                <div className="mx-5">Analytics</div>
              </div>
            </Link>
          </div>
        ) : (
          ""
        )}
        <hr className="text-black h-2" />
      </div>
      {/* laptop */}
    </div>
  );
};

export default Navbar;
