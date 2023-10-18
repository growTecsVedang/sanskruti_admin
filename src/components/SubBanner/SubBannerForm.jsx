import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Home/Sidebar";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearState, addSubBanner } from "../../Redux/slices/SubBannerSlice";
import { ReactDropZone } from "../Banner/BannerForm";
const MAX_SIZE = 5 * 1024 * 1024;
const SubBannerForm = () => {
  const fileInputRef = useRef("");
  const dispatch = useDispatch();
  const { message, type, loading } = useSelector((state) => state.subbanners);
  const [mobileImage, setMobileImage] = useState("");
  const [desktopImage, setDesktopImage] = useState("");
  const [mobileImageName, setMobileImageName] = useState("");
  const [desktopImageName, setDesktopImageName] = useState("");
  const [checked, setChecked] = useState(false);
  const [bannerLink, setbannerLink] = useState("");

  useEffect(() => {
    const notify = (arg) => toast(`${arg}`);
    if (message && type) {
      if (type === "success") {
        notify(message);
        dispatch(clearState());
        window.location.replace("/subbanner");
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

  const handleFileChange = (e, screenType) => {
    const file = e.target.files[0];
    const extension = file.name.split(".")[1];
    if (file?.size !== undefined && file.size > MAX_SIZE) {
      alert("file size exceeded");
      return;
      // NOTE: state set ker joh prevent karega user ko upload karne se
    }
    // Check if file type is other than png or jpg
    if (extension !== "png" && extension !== "jpg" && extension !== "jpeg") {
      alert(
        "Invalid file type. Please upload a file of type png or jpg or jpeg."
      );
      return;
    }
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    console.log("cs");

    reader.onloadend = () => {
      const base64String = reader.result;
      if (screenType === "Desktop") {
        const name = file.name.split(".")[0];
        const extension = file.name.split(".")[1];
        const date = Date.now().toString();
        const imageName = name.concat(date).concat(".").concat(extension);
        setDesktopImageName(imageName);
        setDesktopImage(base64String);
      }
      if (screenType === "Mobile") {
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
    if (desktopImage !== "" && mobileImage !== "" && bannerLink.trim() !== "") {
      dispatch(
        addSubBanner({
          body: {
            isPublished: checked,
            mobileImage,
            mobileImageName,
            desktopImage,
            desktopImageName,
            bannerLink,
          },
        })
      );
      setDesktopImage("");
      setMobileImage("");
      setDesktopImageName("");
      setMobileImageName("");
      setChecked(false);
    }
  };
  console.log(desktopImageName, mobileImageName);

  return (
    <main className="overflow-y-auto w-full p-5 overflow-x-hidden h-[89vh]">
      <div className="flex flex-col p-5 gap-6 rounded-md bg-white">
        <h1 className="text-xl font-semibold">Add Sub Banner</h1>

        <div className="flex w-full gap-6 max-md:flex-col">
          <div className="flex w-full flex-col gap-3">
            <h3 className="text-lg">Desktop Image</h3>
            {desktopImage && desktopImageName ? (
              <>
                <img
                  src={desktopImage}
                  className="w-[100%] h-[200px]  lg:h-[350px] object-contain "
                  alt="upload_image"
                />
                <button
                  onClick={deleteDesktopFile}
                  className="max-w-md mx-auto w-full gap-3 hover:bg-red-200 h-10 flex justify-center items-center bg-gray-200 rounded-lg mt-3 active:bg-slate-300 "
                >
                  <span>Delete Desktop Banner</span>
                  <AiOutlineDelete className="text-[red] h-6 w-6" />
                </button>
              </>
            ) : (
              <ReactDropZone
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                screenType="Desktop"
              />
            )}
          </div>
          <div className="flex w-full flex-col gap-3">
            <h3 className="text-lg">Mobile Image</h3>
            {mobileImage && mobileImageName ? (
              <>
                <img
                  src={mobileImage}
                  className="w-[100%] h-[200px]  lg:h-[350px] object-contain "
                  alt="upload_image"
                />
                <button
                  onClick={deleteMobileFile}
                  className="max-w-md mx-auto w-full gap-3 hover:bg-red-200 h-10 flex justify-center items-center bg-gray-200 rounded-lg mt-3 active:bg-slate-300 "
                >
                  <span>Delete Mobile Banner</span>
                  <AiOutlineDelete className="text-[red] h-6 w-6" />
                </button>
              </>
            ) : (
              <ReactDropZone
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                screenType="Mobile"
              />
            )}
          </div>
        </div>

        <div className="flex gap-6 items-end max-sm:flex-col">
          <div className="flex flex-col max-w-2xl w-full gap-3">
            <h3 className="text-lg">Banner Link</h3>
            <input
              type="text"
              placeholder="Search Review based on product Name"
              value={bannerLink}
              onChange={(e) => setbannerLink(e.target.value)}
              className="w-full focus-within:border-gray-700 bg-white rounded-md border-[1px] border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 "
            />
          </div>
          <div className="flex gap-1 items-center">
            <input
              type="checkbox"
              id="isPublished"
              checked={checked}
              className="hidden"
              onChange={() => setChecked((check) => !check)}
              readOnly
            />
            <label
              className={`border-[1px] ${
                checked ? "border-green-400 bg-green-50" : "border-gray-300"
              } py-2 rounded-md cursor-pointer px-4`}
              htmlFor="isPublished"
            >
              Banner is {checked ? "Published" : "not Published"}
            </label>
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
      </div>
    </main>
  );
};

export default SubBannerForm;
