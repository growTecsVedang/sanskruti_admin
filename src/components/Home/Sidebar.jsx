import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { BsShieldLockFill } from "react-icons/bs";
import { ImImages, ImProfile } from "react-icons/im";
import { CiDiscount1 } from "react-icons/ci";
import { AiOutlineInbox, AiOutlineSetting } from "react-icons/ai";
import { HiCurrencyRupee, HiOutlineClipboardList } from "react-icons/hi";
import { TiContacts } from "react-icons/ti";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../Redux/slices/UserSlice";
import { clearIsAuthenticate } from "../../Redux/slices/LoadUserSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [prod, setProd] = useState(false);
  const [prod1, setProd1] = useState(false);
  const [settings, setSettings] = useState(false);
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
  function handleLogout() {
    const accessToken = getCookie();
    const temp = window.confirm("Do you want to Logout");
    if (temp) {
      dispatch(
        logOutUser({
          cookie: accessToken,
        })
      );
      dispatch(clearIsAuthenticate());
    }
  }

  return (
    <div
      className={
        "hidden lg:block   h-[89vh] w-[20%]   ease-in-out duration-500 overflow-y-scroll   bg-[#fbfbfb] z-20 left-[0px]  "
      }
    >
      <Link to="/home">
        <div className="h-[40px] flex mt-3  w-[200px] pl-5 text-[16px] ">
          <MdOutlineDashboard size={30} />
          <div className="mx-5">Dashboard</div>
        </div>
      </Link>
      <hr className="text-black h-2" />
      <div
        onClick={() => setProd(!prod)}
        className=" cursor-pointer h-[40px] flex mt-3  w-[200px] pl-5 text-[16px]"
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
            <div className="h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-[16px]">
              <div className="mx-5">Categories</div>
            </div>
          </Link>
          <Link to="/subcategories">
            <div className="h-[40px] flex mt-3 items-center w-[200px] pl-5 text-[16px]">
              <div className="mx-5">SubCategories</div>
            </div>
          </Link>
          <Link to="/attributes">
            <div className="h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-[16px]">
              <div className="mx-5">Attributes</div>
            </div>
          </Link>
          <Link to="/products">
            <div className="h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-[16px]">
              <div className="mx-5">Products</div>
            </div>
          </Link>
          <Link to="/productsReviews">
            <div className="h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-[16px]">
              <div className="mx-5">Reviews</div>
            </div>
          </Link>
        </div>
      ) : (
        ""
      )}
      <hr className="text-black h-2" />
      <Link to="/banner">
        <div className="h-[40px] flex mt-3  w-[200px] pl-5 text-[16px]">
          <ImImages size={30} />
          <div className="mx-5">Banner</div>
        </div>
      </Link>

      <hr className="text-black h-2" />
      <Link to="/subbanner">
        <div className="h-[40px] flex mt-3  w-[200px] pl-5 text-[16px]">
          <ImImages size={30} />
          <div className="mx-5">Sub Banner</div>
        </div>
      </Link>
      <hr className="text-black h-2" />
      <Link to="/orders">
        <div className="h-[40px] flex mt-3  w-[200px] pl-5 text-[16px]">
          <MdOutlineDashboard size={30} />
          <div className="mx-5">Orders</div>
        </div>
      </Link>
      <hr className="text-black h-2" />
      <Link to="/contacts">
        <div className="h-[40px] flex mt-3  w-[200px] pl-5 text-[16px]">
          <TiContacts size={30} />
          <div className="mx-5">User Contacts</div>
        </div>
      </Link>
      <hr className="text-black h-2" />
      <Link to="/coupons">
        <div className="h-[40px] flex mt-3  w-[200px] pl-5 text-[16px]">
          <CiDiscount1 size={30} />
          <div className="mx-5">Coupons</div>
        </div>
      </Link>
      <hr className="text-black h-2" />
      <Link to="/users">
        <div className="h-[40px] flex my-3  w-[200px] pl-5 text-[16px]">
          <FiUsers size={30} />
          <div className="mx-5">Users</div>
        </div>
      </Link>

      <hr className="text-black h-2" />
      <Link to="/permissions">
        <div className="h-[40px] flex mt-3  w-[200px] pl-5 text-[16px]">
          <BsShieldLockFill size={30} />
          <div className="mx-5">Permissions</div>
        </div>
      </Link>
      <hr className="text-black h-2" />
      <Link to="/paymentMethods">
        <div className="h-[40px] flex mt-3  w-[200px] pl-5 text-[16px]">
          <HiCurrencyRupee size={30} />
          <div className="ml-5">Payment Method</div>
        </div>
      </Link>
      <hr className="text-black h-2" />
      <div
        onClick={() => setProd1(!prod1)}
        className=" cursor-pointer h-[40px] flex mt-3  w-[200px] pl-5 text-[16px]"
      >
        <AiOutlineInbox size={30} />
        <div className="mx-5">Config</div>
        {prod ? (
          <RiArrowDropUpLine size={30} />
        ) : (
          <RiArrowDropDownLine size={30} />
        )}
      </div>
      {prod1 ? (
        <div className="bg-[#ebf7f7]">
          <Link to="/socials">
            <div className="h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-[16px]">
              <div className="mx-5">Social Media</div>
            </div>
          </Link>
          <Link to="/googleanalytics">
            <div className="h-[40px] flex mt-3 items-center w-[200px] pl-5 text-[16px]">
              <div className="mx-5">Google Tag Manager</div>
            </div>
          </Link>
          <Link to="/whatsappNumber">
            <div className="h-[40px] flex mt-3 items-center w-[200px] pl-5 text-[16px]">
              <div className="mx-5">Whatsapp Number</div>
            </div>
          </Link>
          <Link to="/authkeys">
            <div className="h-[40px] flex mt-3 items-center w-[200px] pl-5 text-[16px]">
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
        className=" cursor-pointer h-[40px] flex mt-3  w-[200px] pl-5 text-[16px]"
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
            <div className="h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-[16px]">
              <div className="mx-5">Return</div>
            </div>
          </Link>
          <Link to="/t&c">
            <div className="h-[40px] flex mt-3 items-center w-[200px] pl-5 text-[16px]">
              <div className="mx-5">T&C</div>
            </div>
          </Link>
          <Link to="/policy">
            <div className="h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-[16px]">
              <div className="mx-5">Privacy Policy</div>
            </div>
          </Link>
        </div>
      ) : (
        ""
      )}
      <hr className="text-black h-2" />
      <div
        className="h-[40px] flex mt-3  w-[200px] pl-5 text-[16px] cursor-pointer  "
        onClick={() => handleLogout()}
      >
        <BiLogOut size={30} />
        <div className="mx-5  ">Logout</div>
      </div>
      <hr className="text-black h-2" />
    </div>
  );
};

export default Sidebar;
