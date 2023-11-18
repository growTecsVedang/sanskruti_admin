import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { addSocials, clearState } from "../../Redux/slices/Config";
import { toast } from "react-toastify";
import { Input } from "../common/Input";
import axios from "axios";
import { useHistory } from "react-router-dom";
const MAX_SIZE = 1024 * 1024;

const SocialForm = () => {
  const notify = (arg) => toast(`${arg}`);
  const { message, type } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  const [Title, setTitle] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageNameArray = file.name.split(".");
    const extension = imageNameArray.pop();
    const name = imageNameArray.join("");
    const date = Date.now().toString();
    const imageName = name.concat(date).concat(".").concat(extension);

    if (file.size > MAX_SIZE) {
      console.log(file.size);
      alert("file size exceeded");
      return;
      // NOTE: state set ker joh prevent karega user ko upload karne se
    }
    // Check if file type is other than png or jpg
    if (extension !== "png" && extension !== "svg") {
      alert("Invalid file type. Please upload a file of type png or svg.");
      return;
    }
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      console.log(base64Image.length);
      setBase64Image(base64String);
      setImageName(imageName);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const deleteFile = () => {
    setImageName("");
    setBase64Image("");
  };

  const createCategorySubmitHandler = (e) => {
    e.preventDefault();

    if (Title.trim() !== "" && imageName.trim() !== "") {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/superadmin/config/social`;
      const headers = {
        "Content-Type": "application/json",
      };
      setLoading(true);
      axios
        .post(
          url,
          {
            media: Title,
            Image: base64Image,
            imageName,
          },
          {
            headers,
            withCredentials: true,
          }
        )
        .then((res) => {
          setLoading(false);
          setTitle("");
          setBase64Image("");
          notify(res.data.message);
          history.push("/socials");
        })
        .catch((err) => {
          setLoading(false);
          notify("Something went wrong");
        });
    }
  };

  useEffect(() => {
    if (message && type) {
      if (type === "success") {
        notify(message);
        dispatch(clearState());
        setTimeout(() => {
          window.location.replace("/socials");
        }, 1000);
      } else {
        notify(message);
        dispatch(clearState());
      }
    }
  }, [dispatch, type, message]);

  return (
    <main className="w-full h-[89vh] p-5 overflow-y-auto">
      <div className="flex flex-col max-w-lg gap-6 rounded-lg p-5 bg-white">
        <h2 className="border-b-[1px] border-gray-300 py-2 text-lg font-semibold">
          Add Social Media
        </h2>
        <form
          onSubmit={createCategorySubmitHandler}
          encType="multipart/form-data"
          className="flex flex-col gap-6"
        >
          <div className="flex w-full flex-col gap-3">
            <h3 className="text-lg">Image</h3>
            {base64Image ? (
              <>
                <img
                  src={base64Image}
                  className="w-[100%] h-[200px]  lg:h-[350px] object-contain "
                  alt="upload_image"
                />
                <button
                  onClick={deleteFile}
                  className="max-w-md mx-auto w-full gap-3 hover:bg-red-200 h-10 flex justify-center items-center bg-gray-200 rounded-lg mt-3 active:bg-slate-300 "
                >
                  <span>Delete Image</span>
                  <AiOutlineDelete className="text-[red] h-6 w-6" />
                </button>
              </>
            ) : (
              <DropZone handleFileChange={handleFileChange} />
            )}
          </div>
          <Input
            input_type="text"
            placeholder="Social Media Link"
            value={Title}
            setValue={setTitle}
          />

          <button
            type="submit"
            className={`w-[150px] h-[45px] bg-[#4361ee] text-white rounded-md flex items-center justify-center cursor-pointer ml-auto ${
              loading && "grayscale"
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default SocialForm;

const DropZone = ({ handleFileChange }) => {
  return (
    <div className="flex cursor-pointer">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center h-[20rem] w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 "
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX SIZE 1MB)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};
