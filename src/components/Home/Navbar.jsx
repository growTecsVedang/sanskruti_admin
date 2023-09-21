import React, { useState } from "react";
import { BiUserCircle, BiCalendarStar } from "react-icons/bi";
import { CiDiscount1 } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  AiOutlineClose,
  AiOutlineInbox,
  AiOutlineSetting,
} from "react-icons/ai";
import { GrDocumentConfig } from "react-icons/gr";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { BsShieldLockFill } from "react-icons/bs";
import { ImImages, ImProfile } from "react-icons/im";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { logOutUser } from "../../Redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const Navbar = () => {
  const history = useHistory();
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
  const [prod1, setProd1] = useState(false);
  const [settings, setSettings] = useState(false);

  function handleLogout() {
    const accessToken = getCookie();
    const temp = window.confirm("Do you want to LogOut");
    if (temp) {
      dispatch(
        logOutUser({
          cookie: accessToken,
        })
      );
      window.location.replace("/");
    }
  }

  return (
    <div className="">
      <nav className="relative px-8 py-4 flex justify-between items-center border-y border-gray-400 ">
        <p className="text-3xl font-bold leading-none flex items-center space-x-4">
          <img src="/sanskruti-logo.svg" className="w-[7rem]" />
        </p>
        <div className="flex gap-5">
          <div className="">
            <div className="flex items-center space-x-2">
              <span className="flex flex-col">
                <Link href="/profile" className="cursor-pointer">
                  <BiUserCircle size={30} />
                </Link>
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
            className="h-[40px] flex mt-3  w-[100%] pl-5 text-[16px]"
            onClick={() => setOpen(false)}
          >
            <MdOutlineDashboard size={30} />
            <div className="mx-5">Dashboard</div>
          </div>
        </Link>
        <hr className="text-black h-2" />
        <div
          onClick={() => setProd(!prod)}
          className=" cursor-pointer h-[40px] flex mt-3  w-[100%] pl-5 text-[16px]"
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
                className="h-[40px] flex mt-3 items-center  w-[100%] pl-5 text-[16px]"
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
                className="h-[40px] flex mt-3 items-center w-[100%] pl-5 text-[16px]"
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
                className="h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-[16px]"
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
                className="h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-[16px]"
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
            className="h-[40px] flex mt-3  w-[200px] pl-5 text-[16px]"
            onClick={() => setOpen(false)}
          >
            <ImImages size={30} />
            <div className="mx-5">Banner</div>
          </div>
        </Link>
        <hr className="text-black h-2" />
        <Link to="/subbanner">
          <div
            className="h-[40px] flex mt-3  w-[200px] pl-5 text-[16px]"
            onClick={() => setOpen(false)}
          >
            <ImImages size={30} />
            <div className="mx-5">Sub Banner</div>
          </div>
        </Link>
        <hr className="text-black h-2" />
        <Link to="/orders">
          <div
            className="h-[40px] flex mt-3  w-[200px] pl-5 text-[16px]"
            onClick={() => setOpen(false)}
          >
            <MdOutlineDashboard size={30} />
            <div className="mx-5">Orders</div>
          </div>
        </Link>
        <hr className="text-black h-2" />
        <Link to="/coupons">
          <div
            className="h-[40px] flex mt-3  w-[200px] pl-5 text-[16px]"
            onClick={() => setOpen(false)}
          >
            <CiDiscount1 size={30} />
            <div className="mx-5">Coupons</div>
          </div>
        </Link>
        <hr className="text-black h-2" />
        <Link to="/users">
          <div
            className="h-[40px] flex my-3  w-[200px] pl-5 text-[16px]"
            onClick={() => setOpen(false)}
          >
            <FiUsers size={30} />
            <div className="mx-5">Users</div>
          </div>
        </Link>

        <hr className="text-black h-2" />
        <Link to="/permissions">
          <div
            className="h-[40px] flex mt-3  w-[200px] pl-5 text-[16px]"
            onClick={() => setOpen(false)}
          >
            <BsShieldLockFill size={30} />
            <div className="mx-5">Permissions</div>
          </div>
        </Link>
        <hr className="text-black h-2" />
        <div
          onClick={() => setProd1(!prod1)}
          className=" cursor-pointer h-[40px] flex mt-3  w-[100%] pl-5 text-[16px]"
        >
          <GrDocumentConfig size={30} />
          <div className="mx-5">Config</div>
          {prod1 ? (
            <RiArrowDropUpLine size={30} />
          ) : (
            <RiArrowDropDownLine size={30} />
          )}
        </div>
        {prod1 ? (
          <div className="bg-[#ebf7f7]">
            <Link to="/socials">
              <div
                className="h-[40px] flex mt-3 items-center  w-[100%] pl-5 text-[16px]"
                onClick={() => setOpen(false)}
              >
                <div className="mx-5">Social Media</div>
              </div>
            </Link>
            <Link to="googleanalytics">
              <div
                className="h-[40px] flex mt-3 items-center w-[100%] pl-5 text-[16px]"
                onClick={() => setOpen(false)}
              >
                <div className="mx-5">Google Analytics</div>
              </div>
            </Link>
            <Link to="/authkeys">
              <div
                className="h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-[16px]"
                onClick={() => setOpen(false)}
              >
                <div className="mx-5">Auth Keys</div>
              </div>
            </Link>
          </div>
        ) : (
          ""
        )}
        <hr className="text-black h-2" />
        <div
          onClick={() => setSettings(!settings)}
          className=" cursor-pointer h-[40px] flex mt-3  w-[100%] pl-5 text-[16px]"
        >
          <HiOutlineClipboardList size={30} />
          <div className="mx-5">Policies</div>
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
                className="h-[40px] flex mt-3 items-center  w-[100%] pl-5 text-[16px]"
                onClick={() => setOpen(false)}
              >
                <div className="mx-5">Return</div>
              </div>
            </Link>
            <Link to="/t&c">
              <div
                className="h-[40px] flex mt-3 items-center w-[100%] pl-5 text-[16px]"
                onClick={() => setOpen(false)}
              >
                <div className="mx-5">T&C</div>
              </div>
            </Link>
            <Link to="/policy">
              <div
                className="h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-[16px]"
                onClick={() => setOpen(false)}
              >
                <div className="mx-5">Privacy Policy</div>
              </div>
            </Link>
          </div>
        ) : (
          ""
        )}
        <hr className="text-black h-2" />
        <div
          className="h-[40px] flex mt-3  w-[200px] pl-5 text-[16px]"
          onClick={() => handleLogout()}
        >
          <BiLogOut size={30} />
          <div className="mx-5">Logout</div>
        </div>
        <hr className="text-black h-2" />
      </div>
      {/* laptop */}
    </div>
  );
};

export default Navbar;
