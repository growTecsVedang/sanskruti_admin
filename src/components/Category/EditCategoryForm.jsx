import React, { useState, useEffect } from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Home/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import {
  updateCategory,
  deleteCategoryImage,
  clearState,
} from "../../Redux/slices/CategorySlice";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingPage from "../common/loading";
const MAX_SIZE = 400 * 1024;
const EditCategoryForm = (props) => {
  const notify = (arg) => toast(`${arg}`);
  const { categories, message, type } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [path, setPath] = useState("");
  const [Title, setTitle] = useState("");
  const [Meta_Title, setMeta_Title] = useState("");
  const [Meta_Description, setMeta_Description] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/user/categories/${props.match.params.id}`
      )
      .then((res) => {
        const responce = res.data.category;
        setId(responce._id);
        setTitle(responce.Title);
        setPath(responce.Image);
        setMeta_Title(responce.Meta_Title);
        setMeta_Description(responce.Meta_Description);
        setImage(responce.Image);
        setLoading(false);
      })
      .catch((err) => {
        const response = err.response.data;
        notify(response.message);
        setLoading(false);
      });
  }, [categories, props]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = file.name.split(".")[0];
    const extension = file.name.split(".")[1];
    const date = Date.now().toString();
    const imageName = name.concat(date).concat(".").concat(extension);
    setImageName(imageName);
    if (file.size > MAX_SIZE) {
      console.log(file.size);
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

    reader.onloadend = () => {
      const base64String = reader.result;
      setBase64Image(base64String);
    };
    console.log(base64Image);

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const deleteFile = () => {
    if (image !== "") {
      const name = image.split(`${process.env.REACT_APP_ENDPOINT_CDN}/`)[1];
      dispatch(
        deleteCategoryImage({
          id,
          name,
        })
      );
      setImage("");
    } else {
      setBase64Image("");
    }
  };

  const createCategorySubmitHandler = (e) => {
    e.preventDefault();

    if (
      Title.trim() !== "" &&
      Meta_Description.trim() !== "" &&
      Meta_Title.trim() !== ""
    ) {
      dispatch(
        updateCategory({
          id,
          body: {
            Title,
            Meta_Title,
            Meta_Description,
            Image: image || base64Image,
            imageName,
          },
        })
      );
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

  return loading ? (
    <LoadingPage />
  ) : (
    <div className=" flex flex-col overflow-y-scroll   h-[89vh] w-[100%] lg:w-[80%] no-scroll ">
      <div className="w-[97%] mx-auto mt-2 mb-[1px] py-3 h-[50px] justify-center bg-white  rounded-md flex flex-col     shadow-md ">
        <h1 className="text-black lg:text-3xl text-2xl   pl-4 ">
          Edit Category
        </h1>
      </div>
      <div className="w-[97%] mx-auto  bg-white  rounded-md flex flex-col     shadow-md ">
        <form
          onSubmit={createCategorySubmitHandler}
          encType="multipart/form-data"
        >
          <div className="flex flex-col w-[95%]  mx-auto mt-5 ">
            <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
              Title
            </label>
            <input
              type="text"
              value={Title}
              onChange={(e) => setTitle(e.target.value.trim().toLowerCase())}
              placeholder="Title"
              className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
            />
          </div>
          <div className="flex flex-col w-[95%]  mx-auto mt-5 ">
            <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
              Meta Title
            </label>
            <input
              type="text"
              value={Meta_Title}
              onChange={(e) => setMeta_Title(e.target.value)}
              className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
              placeholder="Meta Title"
            />
          </div>
          <div className="flex flex-col w-[95%]  mx-auto mt-5 ">
            <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
              Meta Description
            </label>
            <textarea
              type="text"
              value={Meta_Description}
              onChange={(e) => setMeta_Description(e.target.value)}
              className=" min-h-[250px] px-3 py-2 rounded-md border text-black border-gray-300 bg-transparent  text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
              placeholder="Meta Description"
            />
          </div>
          <div className="w-[95%] mx-auto flex   flex-col  lg:flex-row    ">
            <div className="lg:w-[40%]">
              <h2 className="text-lg font-bold mt-5  mx-4 ">Image</h2>
              <div className="w-[95%] mx-auto h-[40px] sm:min-h-[40px] lg:h-[40px] px-5 mt-6  flex items-center bg-[#bde0fe]  ">
                first <strong className="px-2  text-[red]"> Delete </strong>
                the Image and then
                <strong className="px-2 text-[green] "> Upload </strong> .
              </div>
              <div className=" mt-5 mx-3  flex overflow-x-scroll w-full gap-x-6 h-[430px] overflow-y-hidden  ">
                <div className="">
                  {image === "" ? (
                    <div className="w-[300px] h-[350px] border-2 border-gray-200 ">
                      <img
                        src={base64Image}
                        className="w-[300px] h-[350px]"
                        alt="upload_image"
                      />
                    </div>
                  ) : (
                    <div className="w-[300px] h-[350px] border-2 border-gray-200 ">
                      <img
                        src={image}
                        className="w-[300px] h-[350px]"
                        alt="upload_image"
                      />
                    </div>
                  )}
                  <div
                    onClick={deleteFile}
                    className=" cursor-pointer hover:bg-slate-300 w-[300px] h-[40px] flex justify-center items-center bg-gray-200 rounded-lg mt-3 active:bg-slate-300 "
                  >
                    <span>{<AiOutlineDelete size={30} />}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-[60%] lg:flex-grow lg:mt-12 ">
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
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      JPEG, PNG, JPG (MAX. 800x400px) ,MAX_SIZE=1.0MB
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
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

export default EditCategoryForm;
