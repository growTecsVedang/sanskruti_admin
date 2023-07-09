import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Home/Sidebar";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearState, updateBanner } from "../../Redux/slices/BannerSlice";
const MAX_SIZE = 400 * 1024;
const EditBannerForm = (props) => {
  const fileInputRef = useRef("");
  const dispatch = useDispatch();
  const { message, type, banners } = useSelector((state) => state.banners);
  const [mobileImage, setMobileImage] = useState("");
  const [desktopImage, setDesktopImage] = useState("");
  const [Type, setType] = useState("");
  const [checked, setChecked] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    banners.forEach((item) => {
      if (item._id === props.match.params.id) {
        setId(item._id);
        setType(item.type);
        setChecked(item.isPublished);
        setMobileImage(item.mobileImage);
        setDesktopImage(item.desktopImage);
      }
    });
  }, []);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file?.size !== undefined && file.size > MAX_SIZE) {
      alert("file size exceeded");
      return;
      // NOTE: state set ker joh prevent karega user ko upload karne se
    }
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onloadend = () => {
      const base64String = reader.result;
      console.log(Type);
      if (Type === "Desktop") {
        setDesktopImage(base64String);
      }
      if (Type === "Mobile") {
        setMobileImage(base64String);
      }
    };
    console.log(fileInputRef.current.value);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    console.log(fileInputRef.current.value);
  };

  const deleteDesktopFile = () => {
    setDesktopImage("");
  };

  const deleteMobileFile = () => {
    setMobileImage("");
  };

  const createBannerSubmitHandler = (e) => {
    e.preventDefault();
    if (desktopImage !== "" && mobileImage !== "") {
      dispatch(
        updateBanner({
          id,
          body: {
            isPublished: checked,
            mobileImage,
            desktopImage,
          },
        })
      );
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className=" flex w-[full] bg-[#edf2f4] opacity-80 ">
        <Sidebar />
        <div className=" flex flex-col overflow-y-scroll overflow-x-hidden no-scroll  h-[100vh] w-[100%] lg:w-[80%]">
          <div className="w-[97%] mx-auto mt-2 mb-[1px] py-3 h-[50px] justify-center bg-white  rounded-md flex flex-col     shadow-md ">
            <h1 className="text-black lg:text-3xl text-2xl   pl-6 ">
              Add Banner
            </h1>
          </div>
          <div className="w-[97%] mx-auto  bg-white  rounded-md flex flex-col     shadow-md ">
            <form encType="multipart/form-data">
              <div class="  mt-5 flex items-center justify-center   w-[95%]   lg:w-[95%] mx-auto cursor-pointer ">
                <div className="w-[95%] mx-auto flex   flex-col  lg:flex-row    ">
                  <div className="lg:w-[60%]">
                    <h2 className="text-lg font-bold mt-5  mx-4 ">
                      Desktop Banner
                    </h2>
                    <div className=" mt-5 mx-4  flex w- gap-x-6 lg:h-[430px] h-[280px] ">
                      <div className="w-full">
                        <div className="w-[100%] h-[200px]  lg:h-[350px] border-2 border-gray-200 ">
                          <img
                            src={desktopImage}
                            className="w-[100%] h-[200px]  lg:h-[350px]"
                            alt="upload_image"
                          />
                        </div>
                        <div
                          onClick={deleteDesktopFile}
                          className=" cursor-pointer hover:bg-slate-300 lg:w-[60px] w-[full]  h-[40px] flex justify-center items-center bg-gray-200 rounded-lg mt-3 active:bg-slate-300 "
                        >
                          <span className="text-[red]">
                            {<AiOutlineDelete size={30} />}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h2 className="text-lg font-bold mt-5  mx-4 ">
                      Mobile Banner
                    </h2>
                    <div className=" mt-5 mx-4  flex w- gap-x-6 lg:h-[430px] h-[280px] ">
                      <div className="w-full">
                        <div className="w-[100%] h-[200px]  lg:h-[350px] border-2 border-gray-200 ">
                          <img
                            src={mobileImage}
                            className="w-[100%] h-[200px]  lg:h-[350px]"
                            alt="upload_image"
                          />
                        </div>
                        <div
                          onClick={deleteMobileFile}
                          className=" cursor-pointer hover:bg-slate-300 lg:w-[60px] w-[full]  h-[40px] flex justify-center items-center bg-gray-200 rounded-lg mt-3 active:bg-slate-300 "
                        >
                          <span className="text-[red]">
                            {<AiOutlineDelete size={30} />}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-[30%] lg:flex-grow lg:mt-12 ">
                    <div class="  mt-5 flex items-center justify-center   w-[95%]   lg:w-[100%] cursor-pointer ">
                      <label
                        for="dropzone-file"
                        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 "
                      >
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            class="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          ref={fileInputRef}
                          type="file"
                          class="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex lg:flex-row flex-col ">
                <div className="w-[95%] mx-auto mt-[60px] flex  ">
                  <h1 className="flex items-center text-lg text-black mr-4 ">
                    Screen Type
                  </h1>
                  <select
                    onChange={(e) => setType(e.target.value)}
                    value={Type}
                    className="cursor-pointer h-[45px] min-w-[140px] pl-3  bg-gray-50 rounded-md text-lg border-2 border-gray-300 "
                  >
                    <option value="">Screen</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Desktop">Desktop</option>
                  </select>
                </div>
                <div className=" w-[95%] mx-auto  flex h-[50px] items-center mt-[60px]  ">
                  <label
                    htmlFor=""
                    className="flex items-center text-lg text-black mr-4 "
                  >
                    Published
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
              </div>

              <div className="w-full pr-4 mt-3 h-[60px] flex items-center justify-end  ">
                <div
                  onClick={(e) => createBannerSubmitHandler(e)}
                  className="w-[150px] h-[45px]  bg-[#4361ee] text-white rounded-md flex items-center justify-center cursor-pointer "
                >
                  Save
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBannerForm;
