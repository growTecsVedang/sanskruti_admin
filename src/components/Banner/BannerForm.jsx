import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Home/Sidebar";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearState, addBanner } from "../../Redux/slices/BannerSlice";
const MAX_SIZE = 5 * 1024 * 1024;
const BannerForm = () => {
  const fileInputRef = useRef("");
  const dispatch = useDispatch();
  const { message, type, loading } = useSelector((state) => state.banners);
  const [mobileImage, setMobileImage] = useState("");
  const [desktopImage, setDesktopImage] = useState("");
  const [mobileImageName, setMobileImageName] = useState("");
  const [desktopImageName, setDesktopImageName] = useState("");
  const [Type, setType] = useState("");
  const [checked, setChecked] = useState(false);
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
      if (Type === "Desktop") {
        const name = file.name.split(".")[0];
        const extension = file.name.split(".")[1];
        const date = Date.now().toString();
        const imageName = name.concat(date).concat(".").concat(extension);
        setDesktopImageName(imageName);
        setDesktopImage(base64String);
      }
      if (Type === "Mobile") {
        const name = file.name.split(".")[0];
        const extension = file.name.split(".")[1];
        const date = Date.now().toString();
        const imageName = name.concat(date).concat(".").concat(extension);
        setMobileImageName(imageName);
        setMobileImage(base64String);
      }
    };
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const deleteDesktopFile = () => {
    setDesktopImage("");
    setDesktopImageName("");
  };

  const deleteMobileFile = () => {
    setMobileImage("");
    setMobileImageName("");
  };

  const createBannerSubmitHandler = (e) => {
    e.preventDefault();
    if (desktopImage !== "" && mobileImage !== "") {
      dispatch(
        addBanner({
          body: {
            isPublished: checked,
            mobileImage,
            mobileImageName,
            desktopImage,
            desktopImageName,
          },
        })
      );
      setDesktopImage("");
      setMobileImage("");
      setDesktopImageName("");
      setMobileImageName("");
      setType("");
      setChecked(false);
    }
  };
  console.log(desktopImageName, mobileImageName);

  return (
    <div className=" flex flex-col overflow-y-scroll overflow-x-hidden no-scroll  h-[90vh] w-[100%] lg:w-[80%]">
      <div className="w-[97%] mx-auto mt-2 mb-[1px] py-3 h-[50px] justify-center bg-white  rounded-md flex flex-col     shadow-md ">
        <h1 className="text-black lg:text-3xl text-2xl   pl-6 ">Add Banner</h1>
      </div>
      <div className="w-[97%] mx-auto  bg-white  rounded-md flex flex-col     shadow-md ">
        <form encType="multipart/form-data">
          <div class="  mt-5 flex items-center justify-center   w-[95%]   lg:w-[95%] mx-auto  ">
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
                        className="w-[100%] h-[200px]  lg:h-[350px] object-contain "
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
                <h2 className="text-lg font-bold mt-5  mx-4 ">Mobile Banner</h2>
                <div className=" mt-5 mx-4  flex w- gap-x-6 lg:h-[430px] h-[280px] ">
                  <div className="w-full">
                    <div className="w-[100%] h-[200px]  lg:h-[350px] border-2 border-gray-200 ">
                      <img
                        src={mobileImage}
                        className="w-[100%] h-[200px]  lg:h-[350px] object-contain "
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
                        <span class="font-semibold">Click to upload</span> or
                        drag and drop
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
              <h1 className="flex items-center text-lg text-black mr-4 lg:ml-20">
                Screen Type
              </h1>
              <select
                onChange={(e) => setType(e.target.value)}
                value={Type}
                className="cursor-pointer h-[45px] min-w-[140px] pl-3  bg-gray-50 rounded-md text-lg border-2 border-gray-300 "
              >
                <option value="" hidden>
                  Screen
                </option>
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
            {!loading ? (
              <button
                onClick={(e) => createBannerSubmitHandler(e)}
                className="text-white w-[140px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex justify-center items-center"
              >
                Save & edit
              </button>
            ) : (
              <button
                disabled
                type="button"
                class="text-white bg-blue-700 w-[140px] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Uploading...
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerForm;
