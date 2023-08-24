import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Home/Sidebar";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loadAllCategories } from "../../Redux/slices/CategorySlice";
import {
  clearState,
  addSubCategory,
} from "../../Redux/slices/SubCategorySlice";

const SubCategoryForm = () => {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
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
    const cookie = getCookie();
    dispatch(
      loadAllCategories({
        cookie,
      })
    );
  }, [dispatch]);

  const { message, type } = useSelector((state) => state.subcategories);
  const [Title, setTitle] = useState("");
  const [Meta_Title, setMeta_Title] = useState("");
  const [Meta_Description, setMeta_Description] = useState("");
  const [Category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

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

  const createSubCategorySubmitHandler = (e) => {
    e.preventDefault();

    if (
      Title.trim() !== "" &&
      Meta_Description.trim() !== "" &&
      Meta_Title.trim() !== ""
    ) {
      const accessToken = getCookie();
      dispatch(
        addSubCategory({
          cookie: accessToken,
          Title,
          Category,
          Meta_Title,
          Meta_Description,
        })
      );
      setTitle("");
      setMeta_Title("");
      setMeta_Description("");
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
    <div className=" flex flex-col overflow-y-scroll   h-[90vh] w-[100%] lg:w-[80%] no-scroll ">
      <div className="w-[97%] mx-auto mt-2 mb-[1px] py-3 h-[50px] justify-center bg-white  rounded-md flex flex-col     shadow-md ">
        <h1 className="text-black lg:text-3xl text-2xl   pl-6 ">
          Sub Category Form
        </h1>
      </div>
      <div className="w-[97%] mx-auto  bg-white  rounded-md flex flex-col     shadow-md ">
        <form onSubmit={createSubCategorySubmitHandler}>
          <div className="flex flex-col w-[95%]  mx-auto mt-5 ">
            <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
              Title
            </label>
            <input
              type="text"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
              placeholder="Title"
            />
          </div>
          <div className="w-[95%] mx-auto mt-[60px] flex  ">
            <h1 className="flex items-center text-lg text-gray-400 mr-4 ">
              Category
            </h1>
            <select
              defaultValue="category"
              value={Category}
              onChange={handleCategoryChange}
              className="cursor-pointer h-[45px] min-w-[140px] pl-3  bg-gray-50 rounded-md text-lg border-2 border-gray-300 "
            >
              <option>categories</option>
              {categories &&
                categories.map((item, key) => {
                  return (
                    <option key={key} value={item.Title}>
                      {item.Title}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="flex flex-col w-[95%]  mx-auto mt-5 ">
            <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
              Meta Title
            </label>
            <input
              type="text"
              className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
              placeholder="Meta Title"
              value={Meta_Title}
              onChange={(e) => setMeta_Title(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-[95%]  mx-auto mt-5 ">
            <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
              Meta Description
            </label>
            <textarea
              type="text"
              className=" min-h-[250px] px-3 py-2 rounded-md border text-black border-gray-300 bg-transparent  text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
              placeholder="Meta Description"
              value={Meta_Description}
              onChange={(e) => setMeta_Description(e.target.value)}
            />
          </div>
          <div className="w-full pr-4 mt-3 h-[60px] flex items-center justify-end  ">
            <button
              type="submit"
              className="w-[150px] h-[45px]  bg-[#4361ee] text-white rounded-md flex items-center justify-center cursor-pointer "
            >
              Save & edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCategoryForm;
